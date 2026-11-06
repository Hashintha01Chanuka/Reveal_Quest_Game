import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/b.jpeg";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'week'

  // Mock Data for the table
  const leaderboardData = [
    { rank: 1, name: 'Hashintha', words: 2, best: 90, avg: '18.8s' },
    // You can add more mock players here later
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

        {/* Right Side - Leaderboard Card */}
        <div className="w-full max-w-[550px] bg-[#0b1b36] rounded-2xl p-8 shadow-2xl flex flex-col gap-6 border border-white/10">

          <div className="text-center">
            <h2 className="text-white text-3xl font-bold m-0">Leaderboard</h2>
            <p className="text-gray-400 text-sm mt-1">Ranked by words solved, then solving speed</p>
          </div>

          {/* Tabs */}
          <div className="flex bg-[#152c52] p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === 'all' ? 'bg-[#FFD93D] text-[#0b1b36] shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              All time
            </button>
            <button
              onClick={() => setActiveTab('week')}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === 'week' ? 'bg-[#FFD93D] text-[#0b1b36] shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              This week
            </button>
          </div>

          {/* Table */}
          <div className="w-full">
            <div className="grid grid-cols-5 text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3 px-2">
              <div className="col-span-1">#</div>
              <div className="col-span-2">Player</div>
              <div className="col-span-1 text-center">Words</div>
              <div className="col-span-1 text-center">Best</div>
              <div className="col-span-1 text-right">Avg time</div>
            </div>

            <div className="flex flex-col gap-1">
              {leaderboardData.map((player, index) => (
                <div key={index} className="grid grid-cols-5 items-center bg-[#152c52]/50 hover:bg-[#152c52] transition-colors py-3 px-2 rounded-lg text-sm text-white">
                  <div className="col-span-1 font-bold text-gray-300">{player.rank}</div>
                  <div className="col-span-2 font-medium">{player.name}</div>
                  <div className="col-span-1 text-center">{player.words}</div>
                  <div className="col-span-1 text-center">{player.best}</div>
                  <div className="col-span-1 text-right">{player.avg}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate('/home')}
            className="w-full mt-4 bg-transparent border border-white/20 text-white py-3 rounded-lg text-sm font-bold hover:bg-white/5 transition-all"
          >
            Back to home
          </button>
        </div>

      </div>
    </div>
  );
};

export default Leaderboard;
