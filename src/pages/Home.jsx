import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/b.jpeg";

const Home = () => {
  const navigate = useNavigate();

  const [bestScore, setBestScore] = useState(0);
  const [isLoadingScore, setIsLoadingScore] = useState(true);

  useEffect(() => {
    const fetchBestScore = async () => {
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
        })

        const data = await response.json();

        if (response.ok) {
          setBestScore(data.user.bestScore)
        }
      } catch (error) {
        console.error("Failed to fetch best score:", error);
      } finally {
        setIsLoadingScore(false)
      }
    };
    fetchBestScore();
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative font-sans bg-contain bg-center bg-no-repeat bg-[#0f172a]"
      style={{ backgroundImage: `url(${bgImage})` }}
    >

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-5xl p-8 gap-12 md:gap-0">

        <div className="flex-1 flex justify-center items-center">
          <div className="text-center leading-tight">
          </div>
        </div>

        <div className="w-full max-w-[400px] bg-[#0b1b36] rounded-2xl p-8 md:p-10 shadow-2xl flex flex-col gap-4 border border-white/10">

          <div className="text-center mb-2">
            <h2 className="text-white text-3xl font-bold m-0">Ready to Quest</h2>
            <p className="text-gray-400 text-sm mt-1">
              Your best score:{' '}
              {isLoadingScore ? (
                <span className='text-fray-500 animate-pulse'>Loading....</span>
              ) : (
                  <strong className="text-[#FFD93D] text-base">{bestScore}</strong>
              )}
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={() => navigate('/categories')}
              className="w-full bg-[#FFD93D] text-[#0b1b36] py-3 rounded-lg text-lg font-bold hover:bg-[#facc15] active:scale-[0.98] transition-all"
            >
              Start Play
            </button>

            <button
              onClick={() => navigate('/how-to-play')}
              className="w-full bg-[#00E676] text-[#0b1b36] py-3 rounded-lg text-lg font-bold hover:bg-[#00C853] active:scale-[0.98] transition-all"
            >
              How to play
            </button>

            <button
              onClick={() => navigate('/leaderboard')}
              className="w-full bg-[#FFD93D] text-[#0b1b36] py-3 rounded-lg text-lg font-bold hover:bg-[#facc15] active:scale-[0.98] transition-all"
            >
              Leaderboard
            </button>

            <button
              onClick={() => navigate('/profile')}
              className="w-full bg-[#00E676] text-[#0b1b36] py-3 rounded-lg text-lg font-bold hover:bg-[#00C853] active:scale-[0.98] transition-all"
            >
              Profile
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 text-red-400 text-sm hover:text-red-300 transition-colors"
          >
            Log Out
          </button>

        </div>
      </div>
    </div>
  );
};

export default Home;
