const express = require("express")
const mysql = require("mysql2")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cors = require("cors")
require("dotenv").config()
const nodemailer = require("nodemailer")
const { v4: uuidv4 } = require("uuid")

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")
  if (!token) return res.status(401).json({ error: "Access Denied" })

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (err) {
    res.status(400).json({ error: "Invalid Token" })
  }
}

//routes
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body

  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const query =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
    db.query(query, [username, email, hashedPassword], (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Email or username already exists" })
      res.status(201).json({ message: "User registered successfully" })
    })
  } catch (err) {
    res.status(500).json({ error: "Server error" })
  }
})

app.post("/api/login", (req, res) => {
  const { email, password } = req.body

  const query = "SELECT * FROM users WHERE email = ?"
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Server error" })
    if (results.length === 0)
      return res.status(404).json({ error: "User not found" })

    const user = results[0]
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword)
      return res.status(401).json({ error: "Invalid password" })

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    )
    res
      .status(200)
      .json({ token, user: { id: user.id, username: user.username } })
  })
})

app.post('/api/google-login', (req, res) => {
    const { email, username } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ error: "Server error" });

        let user;
        if (results.length === 0) {
            const randomPassword = Math.random().toString(36).slice(-10); 
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(randomPassword, salt);
            
            db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
                [username, email, hashedPassword], 
                (err, result) => {
                    if (err) return res.status(500).json({ error: "Failed to create user" });
                    user = { id: result.insertId, username, email };
                    
                    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.status(200).json({ token, user });
                }
            );
        } else {
            user = results[0];
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token, user: { id: user.id, username: user.username } });
        }
    });
});

app.post("/api/forgot-password", (req, res) => {
  const { email } = req.body

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ error: "Server error" })
      if (results.length === 0)
        return res.status(404).json({ error: "Email not found" })

      const user = results[0]
      const resetToken = uuidv4()
      const expiry = new Date(Date.now() + 3600000) // 1 hour

      const updateQuery =
        "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?"
      db.query(updateQuery, [resetToken, expiry, user.id], async (err) => {
        if (err)
          return res.status(500).json({ error: "Failed to generate token" })

        try {
          let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          })

          const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`

          let info = await transporter.sendMail({
            from: `"Reveal Quest" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Password Reset Request - Reveal Quest",
            html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                            <h2 style="color: #0b1b36; text-align: center;">Reveal Quest</h2>
                            <p>Hello ${user.username},</p>
                            <p>You requested a password reset. Click the button below to set a new password:</p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${resetLink}" style="background-color: #FFD93D; color: #0b1b36; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">Reset Password</a>
                            </div>
                            <p style="font-size: 12px; color: #666;">If you didn't request this, you can safely ignore this email. This link expires in 1 hour.</p>
                            <p style="font-size: 12px; color: #666;">Link: ${resetLink}</p>
                        </div>
                    `,
          })

          console.log("Email sent successfully: ", info.messageId)
          res.status(200).json({ message: "Reset link sent to email" })
        } catch (error) {
          console.error("Email send error:", error)
          res
            .status(500)
            .json({ error: "Failed to send email. Check server logs." })
        }
      })
    },
  )
})

app.post("/api/reset-password", (req, res) => {
  const { token, newPassword } = req.body

  // Check if token exists and is not expired
  const query =
    "SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()"

  db.query(query, [token], async (err, results) => {
    if (err) return res.status(500).json({ error: "Server error" })
    if (results.length === 0)
      return res.status(400).json({ error: "Invalid or expired token" })

    const user = results[0]

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    // Update password and clear the token
    const updateQuery =
      "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?"
    db.query(updateQuery, [hashedPassword, user.id], (err) => {
      if (err)
        return res.status(500).json({ error: "Failed to update password" })
      res.status(200).json({ message: "Password successfully reset" })
    })
  })
})

app.post("/api/score", verifyToken, (req, res) => {
  const { score } = req.body;
  const userId = req.user.id;

  if (!score) return res.status(400).json({ error: "Score is required" });

  const query = "INSERT INTO scores (user_id, score) VALUES (?, ?)";
  db.query(query, [userId, score], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Could not save score" });
    }
    res.status(201).json({ message: "Score saved successfully" });
  });
});

app.get("/api/leaderboard", (req, res) => {
  const query = `
    SELECT users.username, MAX(scores.score) as score 
    FROM scores 
    JOIN users ON scores.user_id = users.id 
    GROUP BY users.id, users.username
    ORDER BY score DESC 
    LIMIT 10
  `

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err)
      return res.status(500).json({ error: "Could not fetch leaderboard" })
    }
    res.status(200).json(results)
  })
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
