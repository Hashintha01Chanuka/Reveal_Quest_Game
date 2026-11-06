import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/b.jpeg";

const HowToPlay = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative font-sans bg-contain bg-center bg-no-repeat bg-[#0f172a]"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-5xl p-8 gap-12 md:gap-0">

        {/* Left Side - Logo Area */}
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center leading-tight">
            {/* You can add your text or image logo here later */}
          </div>
        </div>

        {/* Right Side - How To Play Card */}
        <div className="w-full max-w-[450px] bg-[#0b1b36] rounded-2xl p-8 md:p-10 shadow-2xl flex flex-col gap-5 border border-white/10">

          <div className="text-center mb-2">
            <h2 className="text-white text-3xl font-bold m-0">How to play</h2>
            <p className="text-gray-400 text-sm mt-1">Uncover the hidden word in each of 5 rounds</p>
          </div>

          <ol className="list-decimal list-inside text-gray-300 text-sm flex flex-col gap-3">
            <li>Each round hides a word. You only see its length.</li>
            <li>Solve the Banana puzzle: type the missing number. A correct answer reveals one random letter.</li>
            <li>Buy a category hint or a clue with your points, for example "Category: Fruit".</li>
            <li>Think you know it? Guess the whole word at any time for a bonus. The fewer letters shown, the bigger the bonus.</li>
            <li>Rounds get harder: longer words and less time per puzzle.</li>
          </ol>

          <div className="bg-[#152c52] rounded-xl p-4 text-sm text-gray-300 flex flex-col gap-2 mt-2">
            <p><span className="text-[#FFD93D] font-semibold">Correct puzzle:</span> +10 points, plus up to +10 for speed</p>
            <p><span className="text-[#FFD93D] font-semibold">Wrong answer:</span> lose a life and 5 points</p>
            <p><span className="text-[#FFD93D] font-semibold">Time runs out:</span> lose a life</p>
            <p><span className="text-[#FFD93D] font-semibold">Wrong word guess:</span> lose a life and 10 points</p>
            <p><span className="text-[#FFD93D] font-semibold">Hints:</span> category 5 points, clue 10 points</p>
            <p><span className="text-[#FFD93D] font-semibold">Weekly challenge:</span> same words for everyone, one attempt</p>
          </div>

          <button
            onClick={() => navigate('/home')}
            className="w-full mt-4 bg-[#FFD93D] text-[#0b1b36] py-3 rounded-lg text-lg font-bold hover:bg-[#facc15] active:scale-[0.98] transition-all"
          >
            Got it
          </button>
        </div>

      </div>
    </div>
  );
};

export default HowToPlay;
