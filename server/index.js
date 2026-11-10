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


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
