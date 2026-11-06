import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/b.jpeg";

const Profile = () => {
  const navigate = useNavigate();

  // Mock User Data
  const user = {
    name: 'Hashintha',
    email: 'test@example.com',
    joined: '11/5/2026',
    wordsSolved: 2,
    accuracy: '86%',
    bestScore: 90,
    winStreak: 0,
    bestStreak: 0,
    gamesWon: '0/8',
    avgTime: '18.8s',
    fastestTime: '11.2s',
  };

  // Mock Recent Games Data
  const recentGames = [
    { mode: 'Normal', status: 'quit', words: 0, pts: 0 },
    { mode: 'Normal', status: 'quit', words: 0, pts: 0 },
    { mode: 'Normal', status: 'quit', words: 0, pts: 0 },
    { mode: 'Normal', status: 'quit', words: 0, pts: 0 },
    { mode: 'Normal', status: 'quit', words: 0, pts: 0 },
  ];

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative font-sans bg-contain bg-center bg-no-repeat bg-[#0f172a]"
      style={{ backgroundImage: `url(${bgImage})` }}
    >

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-5xl p-8 gap-12 md:gap-0">

        {/* Left Side - Logo Area */}
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center leading-tight">
            {/* Logo placeholder */}
          </div>
        </div>

        {/* Right Side - Profile Card */}
        <div className="w-full max-w-[550px] bg-[#0b1b36] rounded-2xl p-8 shadow-2xl flex flex-col gap-6 border border-white/10">

          <div className="text-center">
            <h2 className="text-white text-3xl font-bold m-0">{user.name}</h2>
            <p className="text-gray-400 text-sm mt-1">{user.email} • joined {user.joined}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            {/* Row 1 */}
            <div className="bg-[#152c52] rounded-xl p-3 flex flex-col items-center justify-center text-center">
              <span className="text-white text-xl font-bold">{user.wordsSolved}</span>
              <span className="text-gray-400 text-xs mt-1">Words solved</span>
            </div>
            <div className="bg-[#152c52] rounded-xl p-3 flex flex-col items-center justify-center text-center">
              <span className="text-white text-xl font-bold">{user.accuracy}</span>
              <span className="text-gray-400 text-xs mt-1">Accuracy</span>
            </div>
            <div className="bg-[#152c52] rounded-xl p-3 flex flex-col items-center justify-center text-center">
              <span className="text-white text-xl font-bold">{user.bestScore}</span>
              <span className="text-gray-400 text-xs mt-1">Best score</span>
            </div>

            {/* Row 2 */}
            <div className="bg-[#152c52] rounded-xl p-3 flex flex-col items-center justify-center text-center">
              <span className="text-white text-xl font-bold">{user.winStreak}</span>
              <span className="text-gray-400 text-xs mt-1">Win streak</span>
            </div>
            <div className="bg-[#152c52] rounded-xl p-3 flex flex-col items-center justify-center text-center">
              <span className="text-white text-xl font-bold">{user.bestStreak}</span>
              <span className="text-gray-400 text-xs mt-1">Best streak</span>
            </div>
            <div className="bg-[#152c52] rounded-xl p-3 flex flex-col items-center justify-center text-center">
              <span className="text-white text-xl font-bold">{user.gamesWon}</span>
              <span className="text-gray-400 text-xs mt-1">Games won</span>
            </div>

            {/* Row 3 */}
            <div className="bg-[#152c52] rounded-xl p-3 flex flex-col items-center justify-center text-center col-span-1">
              <span className="text-white text-xl font-bold">{user.avgTime}</span>
              <span className="text-gray-400 text-xs mt-1">Avg solve time</span>
            </div>
            <div className="bg-[#152c52] rounded-xl p-3 flex flex-col items-center justify-center text-center col-span-1">
              <span className="text-white text-xl font-bold">{user.fastestTime}</span>
              <span className="text-gray-400 text-xs mt-1">Fastest solve</span>
            </div>
            <div className="col-span-1"></div> {/* Empty space to keep grid aligned */}
          </div>

          {/* Recent Games List */}
          <div>
            <h3 className="text-white text-sm font-bold mb-3">Recent games</h3>
            <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
              {recentGames.map((game, i) => (
                <div key={i} className="flex justify-between items-center bg-[#152c52] px-4 py-3 rounded-lg text-sm text-gray-300">
                  <span>{game.mode} - {game.status}</span>
                  <span>{game.words} words • {game.pts} pts</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate('/home')}
            className="w-full mt-2 bg-transparent border border-white/20 text-white py-3 rounded-lg text-sm font-bold hover:bg-white/5 transition-all"
          >
            Back to home
          </button>

          <div className="text-center mt-2">
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 text-sm hover:text-white transition-colors"
            >
              Log out
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
