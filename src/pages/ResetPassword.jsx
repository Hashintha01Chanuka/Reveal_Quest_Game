import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import bgImage from "../assets/b.jpeg";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from URL (e.g., /reset-password?token=abc123)
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!token) {
      setError("No reset token found in URL.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      });
      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset successfully! Redirecting to login...');
        setTimeout(() => navigate('/'), 2000);
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
        <h2 className="text-white text-3xl font-bold text-center">Set New Password</h2>

        {message && <div className="bg-green-500/20 text-green-400 p-3 rounded-lg text-sm text-center">{message}</div>}
        {error && <div className="bg-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 outline-none"
          />
          <button type="submit" className="w-full bg-[#FFD93D] text-[#0b1b36] py-3 rounded-lg font-bold hover:bg-[#facc15]">
            Reset Password
          </button>
        </form>

        <div className="text-center mt-2">
          <Link to="/" className="text-gray-400 text-sm hover:text-white">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
