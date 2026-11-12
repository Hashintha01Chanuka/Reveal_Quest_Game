import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/b.jpeg";

const Profile = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          setProfileData(data);
        } else {
          setError(data.error || "Failed to load profile");
        }
      } catch (err) {
        setError("Cannot connect to server");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (isLoading) {
    return <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white text-xl">Loading profile...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-red-500 text-xl">{error}</div>;
  }

  const { user, recentGames } = profileData;

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative font-sans bg-contain bg-center bg-no-repeat bg-[#0f172a]"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-5xl ml-60 p-8 gap-12 md:gap-0">

        <div className="flex-1 flex justify-center items-center"></div>

        <div className="w-full max-w-[550px] bg-[#0b1b36] rounded-2xl p-8 shadow-2xl flex flex-col gap-6 border border-white/10">
          <div className="text-center">
            <h2 className="text-white text-3xl font-bold m-0">{user.name}</h2>
            <p className="text-gray-400 text-sm mt-1">Player Statistics</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
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

            <div className="bg-[#152c52] rounded-xl p-3 flex flex-col items-center justify-center text-center">
              <span className="text-white text-xl font-bold">{user.gamesWon}</span>
              <span className="text-gray-400 text-xs mt-1">Games won</span>
            </div>

            <div className="bg-[#152c52] rounded-xl p-3 flex flex-col items-center justify-center text-center col-span-1">
              <span className="text-white text-xl font-bold">{user.avgTime === '0s' ? '-' : user.avgTime}</span>
              <span className="text-gray-400 text-xs mt-1">Avg solve time</span>
            </div>
            <div className="bg-[#152c52] rounded-xl p-3 flex flex-col items-center justify-center text-center col-span-1">
              <span className="text-white text-xl font-bold"> {user.fastestTime === '0s' ? '-' : user.fastestTime}</span>
              <span className="text-gray-400 text-xs mt-1">Fastest solve</span>
            </div>
            <div className="col-span-1"></div>
          </div>

          <div>
            <h3 className="text-white text-sm font-bold mb-3">Recent games</h3>
            <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
              {recentGames.map((game, i) => (
                <div key={i} className="flex justify-between items-center bg-[#152c52] px-4 py-3 rounded-lg text-sm text-gray-300">
                  <span className={game.is_win ? "text-[#00E676]" : "text-red-400"}>
                    {game.is_win ? "Win" : "Loss"}
                  </span>
                  <span>{game.words_solved} words • {game.score} pts</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => navigate('/home')} className="w-full mt-2 bg-transparent border border-white/20 text-white py-3 rounded-lg text-sm font-bold hover:bg-white/5 transition-all">
            Back to home
          </button>

          <div className="text-center mt-2">
            <button onClick={handleLogout} className="text-gray-400 text-sm hover:text-white transition-colors">
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
