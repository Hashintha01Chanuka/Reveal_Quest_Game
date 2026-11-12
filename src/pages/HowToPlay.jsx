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
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-5xl ml-220 p-8 gap-12 md:gap-0">

        <div className="w-full max-w-[480px] bg-[#0b1b36] rounded-2xl p-8 shadow-2xl flex flex-col gap-5 border border-white/10 max-h-[90vh] overflow-y-auto custom-scrollbar">

          <div className="text-center mb-2">
            <h2 className="text-white text-3xl font-bold m-0">How to play</h2>
            <p className="text-gray-400 text-sm mt-1">Master the quest in 5 simple steps</p>
          </div>

          <ol className="list-decimal list-inside text-gray-300 text-sm flex flex-col gap-3">
            <li>Select a <strong>Category</strong> to begin your 5-round quest.</li>
            <li>In each round, a hidden word appears. You get <strong>1 free letter</strong> and a clue to start.</li>
            <li>Type a letter or guess the whole word using the input box.</li>
            <li>Stuck? Click <strong>"Solve Puzzle"</strong> to fetch a math puzzle from the Banana API. Solving it reveals a random letter!</li>
            <li>Be fast! You have a 45-second timer per round. Lose all 5 hearts, and the game is over.</li>
          </ol>

          <div className="bg-[#152c52] rounded-xl p-4 text-sm text-gray-300 flex flex-col gap-2 mt-2">
            <p><span className="text-[#FFD93D] font-semibold">Correct Letter:</span> +10 points</p>
            <p><span className="text-[#FFD93D] font-semibold">Correct Math Puzzle:</span> +10 points & reveals a letter</p>
            <p><span className="text-[#FFD93D] font-semibold">Winning the Round:</span> +50 bonus points</p>
            <p><span className="text-[#FFD93D] font-semibold">Wrong Guess/Puzzle:</span> Lose 1 heart</p>
            <p><span className="text-[#FFD93D] font-semibold">Time runs out:</span> Game Over</p>
            <p className="mt-1 text-xs text-gray-400 italic">
              Note: Your final score is saved to the leaderboard if you win, or if you lose all your hearts.
            </p>
          </div>

          <button
            onClick={() => navigate('/home')}
            className="w-full mt-2 bg-[#FFD93D] text-[#0b1b36] py-3 rounded-lg text-lg font-bold hover:bg-[#facc15] active:scale-[0.98] transition-all"
          >
            Got it
          </button>

        </div>

      </div>
    </div>
  );
};

export default HowToPlay;
