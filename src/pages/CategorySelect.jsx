import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/b.jpeg";

const CategorySelect = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative font-sans bg-contain bg-center bg-no-repeat bg-[#0f172a]" style={{ backgroundImage: `url(${bgImage})` }}>

      <div className="relative z-10 w-full max-w-[500px] bg-[#0b1b36] rounded-3xl ml-150 p-8 shadow-2xl border border-white/10 text-center">
        <h2 className="text-white text-3xl font-bold mb-2">Select a Category</h2>
        <p className="text-gray-400 text-sm mb-6">Choose your challenge for the next 5 rounds</p>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => navigate('/game', { state: { category: cat } })}
              className="bg-[#152c52] text-white py-4 rounded-xl font-bold hover:bg-[#FFD93D] hover:text-[#0b1b36] transition-all border border-white/10"
            >
              {cat}
            </button>
          ))}
        </div>

        <button onClick={() => navigate('/home')} className="mt-6 text-gray-400 text-sm hover:text-white">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default CategorySelect;
