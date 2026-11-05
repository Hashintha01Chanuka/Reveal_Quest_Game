import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/b.jpeg";

const Game = () => {
  const navigate = useNavigate();

  // Basic state for the UI
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30);

  const handleSubmit = (e) => {
    e.preventDefault();
    // API logic will go here later
    console.log("Submitted answer:", answer);
    setAnswer('');
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative font-sans bg-contain bg-center bg-no-repeat bg-[#0f172a]"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative z-10 w-full max-w-4xl p-4 md:p-8 flex flex-col gap-6">

        <div className="flex justify-between items-center bg-[#0b1b36] border border-white/10 rounded-xl p-4 shadow-lg">
          <div className="text-white font-bold text-lg">
            Score: <span className="text-[#FFD93D]">{score}</span>
          </div>
          <div className="text-white font-bold text-xl bg-white/10 px-4 py-1 rounded-full">
            ⏱ {timeLeft}s
          </div>
          <div className="text-red-500 text-xl flex gap-1">
            {/* Simple way to render lives */}
            {[...Array(3)].map((_, i) => (
              <span key={i} className={i < lives ? "opacity-100" : "opacity-30"}>❤️</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 mt-4">

          {/* Hidden Word Display */}
          <div className="flex gap-2 md:gap-4">
            {['B', 'A', '', 'A', '', 'A'].map((letter, index) => (
              <div
                key={index}
                className="w-12 h-16 md:w-16 md:h-20 bg-[#0b1b36] border-b-4 border-[#FFD93D] rounded-t-lg flex items-center justify-center text-3xl md:text-4xl font-bold text-white shadow-lg"
              >
                {letter}
              </div>
            ))}
          </div>

          {/* Banana API Puzzle Area */}
          <div className="w-full max-w-md bg-white rounded-2xl p-4 shadow-[0_0_30px_rgba(255,217,61,0.2)] flex justify-center items-center min-h-[200px]">
            <div className="text-gray-400 font-medium text-center">
              [ Banana API Puzzle Image Will Load Here ]
              <br />
              <span className="text-4xl mt-4 block">🍌 + 🍎 = ?</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
            <input
              type="number"
              placeholder="Enter your answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              className="w-full px-4 py-4 rounded-xl bg-white border-none outline-none text-xl text-center font-bold text-gray-900 focus:ring-4 focus:ring-[#FFD93D]/50 transition-shadow shadow-lg"
            />

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-[#FFD93D] text-[#0b1b36] py-3 rounded-lg text-lg font-bold hover:bg-[#facc15] active:scale-[0.98] transition-all"
              >
                Submit Answer
              </button>

              <button
                type="button"
                className="flex-1 bg-[#00E676] text-[#0b1b36] py-3 rounded-lg text-lg font-bold hover:bg-[#00C853] active:scale-[0.98] transition-all flex justify-center items-center gap-2"
              >
                💡 Hint (-10)
              </button>
            </div>
          </form>

          <button
            type="button"
            onClick={() => navigate('/home')}
            className="text-gray-400 text-sm hover:text-white transition-colors underline mt-2"
          >
            Give up & Return Home
          </button>

        </div>
      </div>
    </div>
  );
};

export default Game;
