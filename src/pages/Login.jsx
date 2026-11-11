import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import bgImage from "../assets/b.jpeg";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/home');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Cannot connect to server');
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
    <div className="min-h-screen w-full flex items-center justify-center relative font-sans bg-contain bg-center bg-no-repeat bg-[#0f172a]" style={{ backgroundImage: `url(${bgImage})` }}>

      <div className="relative z-10 w-full max-w-[400px] bg-[#0b1b36] rounded-2xl ml-150 p-8 md:p-10 shadow-2xl flex flex-col gap-4 border border-white/10">
        <div className="text-center mb-2">
          <h2 className="text-white text-3xl font-bold m-0">Welcome Back!</h2>
          <p className="text-gray-400 text-sm mt-1">Log in to continue playing</p>
        </div>

        {error && <div className="bg-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center">{error}</div>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 outline-none" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 outline-none" />

          <div className="flex justify-between items-center text-white text-sm mt-1">
                        <label className="flex items-center gap-2 cursor-pointer">
                        </label>
                        <Link to="/forgot-password" className="hover:underline">Forgot Password?</Link>
                      </div>

          <button type="submit" className="w-full mt-2 bg-[#FFD93D] text-[#0b1b36] py-3 rounded-lg text-lg font-bold hover:bg-[#facc15]">
            Login
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
          Don't you have an account? <Link to="/register" className="text-[#FFD93D] font-semibold hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
