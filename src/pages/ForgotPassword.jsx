import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bgImage from "../assets/b.jpeg";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();

      if (response.ok) {
        setMessage('Check your email for a reset link! (Check the Node.js terminal for the test link)');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Cannot connect to server');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative font-sans bg-contain bg-center bg-no-repeat bg-[#0f172a]" style={{ backgroundImage: `url(${bgImage})` }}>
      
      <div className="relative z-10 w-full max-w-[400px] bg-[#0b1b36] rounded-2xl ml-150 p-8 shadow-2xl flex flex-col gap-4 border border-white/10">
        <h2 className="text-white text-3xl font-bold text-center">Forgot Password</h2>
        <p className="text-gray-400 text-sm text-center">Enter your email to receive a reset link</p>

        {message && <div className="bg-green-500/20 text-green-400 p-3 rounded-lg text-sm text-center">{message}</div>}
        {error && <div className="bg-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 outline-none"
          />
          <button type="submit" className="w-full bg-[#FFD93D] text-[#0b1b36] py-3 rounded-lg font-bold hover:bg-[#facc15]">
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-2">
          <Link to="/" className="text-gray-400 text-sm hover:text-white">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
