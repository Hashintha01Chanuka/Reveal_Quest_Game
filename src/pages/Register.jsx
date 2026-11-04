import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bgImage from "../assets/b.jpeg";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Registering:', name, email, password);
    navigate('/home');
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative font-sans bg-contain bg-center bg-no-repeat bg-[#0f172a]"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-5xl p-8 gap-12 md:gap-0">

        <div className="flex-1 flex justify-center items-center">
          <div className="text-center leading-tight">
          </div>
        </div>

        <div className="w-full max-w-[400px] bg-[#0b1b36] rounded-2xl p-8 md:p-10 shadow-2xl flex flex-col gap-4 border border-white/10">

          <div className="text-center mb-2">
            <h2 className="text-white text-3xl font-bold m-0">Create account</h2>
            <p className="text-gray-400 text-sm mt-1">Join the quiz and test your knowledge</p>
          </div>

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
                <input type="checkbox" className="accent-[#FFD93D] w-4 h-4" /> Remember me
              </label>
              <a href="#forgot" className="hover:underline">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-[#FFD93D] text-[#0b1b36] py-3 rounded-lg text-lg font-bold hover:bg-[#facc15] active:scale-[0.98] transition-all"
            >
              Register
            </button>
          </form>

          <div className="text-gray-400 text-sm text-center mt-4">
            Already have an account? <Link to="/" className="text-[#FFD93D] font-semibold hover:underline">Login</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
