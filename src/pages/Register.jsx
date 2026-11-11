import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import bgImage from "../assets/b.jpeg";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully! Please log in.");
        navigate('/');
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Cannot connect to the server. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

   const handleGoogleSuccess = async (credentialResponse) => {
      const decoded = jwtDecode(credentialResponse.credential);
  
      try {
        const response = await fetch('http://localhost:5000/api/google-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: decoded.email,
            username: decoded.name
          })
        });
  
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/home');
        } else {
          setError(data.error || 'Google Login failed on server');
        }
      } catch (err) {
        setError('Cannot connect to server');
      }
    };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative font-sans bg-contain bg-center bg-no-repeat bg-[#0f172a]"
      style={{ backgroundImage: `url(${bgImage})` }}
    >

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-5xl ml-150 p-8 gap-12 md:gap-0">

        <div className="w-full max-w-[400px] bg-[#0b1b36] rounded-2xl mx-auto md:ml-auto p-8 md:p-10 shadow-2xl flex flex-col gap-4 border border-white/10">

          <div className="text-center mb-2">
            <h2 className="text-white text-3xl font-bold m-0">Create account</h2>
            <p className="text-gray-400 text-sm mt-1">Join the quiz and test your knowledge</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#ffffff] border-none outline-none text-base font-sans text-gray-900 focus:ring-4 focus:ring-[#FFD93D]/50 transition-shadow"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#ffffff] border-none outline-none text-base font-sans text-gray-900 focus:ring-4 focus:ring-[#FFD93D]/50 transition-shadow"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#ffffff] border-none outline-none text-base font-sans text-gray-900 focus:ring-4 focus:ring-[#FFD93D]/50 transition-shadow"
              />
            </div>

            <div className="flex justify-between items-center text-white text-sm mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-[#FFD93D] w-4 h-4" required /> Remember me
              </label>
              <Link to="/forgot-password" className="hover:underline">Forgot Password?</Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-[#FFD93D] text-[#0b1b36] py-3 rounded-lg text-lg font-bold hover:bg-[#facc15] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <div className="flex items-center gap-4 my-2">
                    <div className="h-px bg-white/20 flex-1"></div>
                    <span className="text-gray-400 text-sm">OR</span>
                    <div className="h-px bg-white/20 flex-1"></div>
                  </div>
          
                  <div className="flex justify-center w-full">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => setError('Google Login Failed')}
                      theme="filled_black"
                      shape="pill"
                      width="100%"
                    />
                  </div>

          <div className="text-gray-400 text-sm text-center mt-4">
            Already have an account? <Link to="/" className="text-[#FFD93D] font-semibold hover:underline">Login</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
