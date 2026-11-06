import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/b.jpeg";

const Game = () => {
  const navigate = useNavigate();

  // --- Game State ---
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [timeLeft, setTimeLeft] = useState(45);
  const maxTime = 45;

  // Game Data
  const [category] = useState('Famous Fruit');
  const [targetWord, setTargetWord] = useState('BANANA');

  // Revealed letters tracking
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Puzzle Visibility State
  const [isPuzzleVisible, setIsPuzzleVisible] = useState(false);

  // Inputs
  const [puzzleAnswer, setPuzzleAnswer] = useState('');
  const [wordGuess, setWordGuess] = useState('');

  // --- Initial Setup: Reveal 1 random letter to start ---
  useEffect(() => {
    const uniqueLetters = [...new Set(targetWord.split(''))];
    const randomLetter = uniqueLetters[Math.floor(Math.random() * uniqueLetters.length)];
    setGuessedLetters([randomLetter]);
  }, [targetWord]);

  // --- Handlers ---

  // 1. Check the Math Puzzle Answer
  const handleCheckPuzzle = (e) => {
    e.preventDefault();

    // MOCK LOGIC: The correct answer to the image is 3
    if (puzzleAnswer === '3') {
      revealRandomLetter();
      setScore(score + 5); // Reward for solving puzzle
    } else {
      alert("Wrong math answer! Try again.");
    }
    setPuzzleAnswer('');
    setIsPuzzleVisible(false); // Hide the puzzle after checking
  };

  // 2. Guess the Whole Word
  const handleGuessWord = (e) => {
    e.preventDefault();
    const guess = wordGuess.toUpperCase().trim();

    if (!guess) return;

    if (guess === targetWord) {
      setGuessedLetters(targetWord.split('')); // Reveal all
      setScore(score + 50);
      alert("You got the word!");
    }
    else if (guess.length === 1 && targetWord.includes(guess)) {
      if (!guessedLetters.includes(guess)) {
        setGuessedLetters([...guessedLetters, guess]);
        setScore(score + 10);
      }
    }
    else {
      setLives(lives - 1);
      if (lives - 1 === 0) handleGameOver();
    }
    setWordGuess('');
  };

  // Helper to reveal a random letter
  const revealRandomLetter = () => {
    const remainingLetters = targetWord.split('').filter(l => !guessedLetters.includes(l));
    if (remainingLetters.length > 0) {
      const uniqueRemaining = [...new Set(remainingLetters)];
      const randomLetter = uniqueRemaining[Math.floor(Math.random() * uniqueRemaining.length)];
      setGuessedLetters([...guessedLetters, randomLetter]);
    } else {
      alert("All letters already revealed!");
    }
  };

  const handleGameOver = () => {
    alert("Game Over!");
    navigate('/home');
  };

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

      {/* Main Game Card */}
      <div className="relative z-10 w-full max-w-[500px] bg-[#0b1b36] rounded-3xl p-6 shadow-2xl flex flex-col gap-5 border border-white/10">

        {/* Top Bar */}
        <div className="flex justify-between items-center text-sm font-semibold">
          <div className="text-gray-300">Round 1/5</div>
          <div className="text-red-500 tracking-widest text-lg">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < lives ? "opacity-100" : "opacity-20"}>♥</span>
            ))}
          </div>
          <div className="text-[#FFD93D] text-lg">{score} pts</div>
        </div>

        {/* Hidden Word Display */}
        <div className="flex justify-center gap-2 mt-2">
          {targetWord.split('').map((letter, index) => (
            <div
              key={index}
              className="w-12 h-12 bg-[#152c52] rounded-md border border-white/10 flex items-center justify-center text-2xl font-bold text-white shadow-inner transition-all duration-300"
            >
              {guessedLetters.includes(letter) ? letter : ''}
            </div>
          ))}
        </div>

        <div className="text-center text-gray-400 text-sm">
          Hint: It is a {category}
        </div>

        {/* --- CONDITIONAL PUZZLE AREA --- */}
        {isPuzzleVisible ? (
          <div className="animate-fade-in flex flex-col gap-3">
            <div className="w-full bg-white rounded-xl overflow-hidden shadow-lg p-1">
              <img
                src={"https://marcconrad.com/uob/banana/banana_001.png"}
                alt="Math Puzzle"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <form onSubmit={handleCheckPuzzle} className="flex gap-2">
              <input
                type="number"
                placeholder="Missing number"
                value={puzzleAnswer}
                onChange={(e) => setPuzzleAnswer(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg bg-white border-none outline-none text-gray-900 font-medium"
              />
              <button
                type="submit"
                className="bg-[#a68a3e] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#8c7332] transition-colors"
              >
                Check
              </button>
              <button
                type="button"
                onClick={() => setIsPuzzleVisible(false)}
                className="bg-gray-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-gray-700 transition-colors"
              >
                X
              </button>
            </form>
          </div>
        ) : (
          <div className="animate-fade-in flex flex-col gap-4">
            {/* Hide Puzzle Button */}
            <button
              onClick={() => setIsPuzzleVisible(true)}
              className="w-full bg-[#152c52] text-[#FFD93D] border border-[#FFD93D]/30 py-3 rounded-lg font-bold hover:bg-[#1e3b6d] transition-colors flex justify-center items-center gap-2"
            >
              🍌 Solve Puzzle to Reveal a Letter
            </button>

            <div className="flex items-center gap-4">
              <div className="h-px bg-white/10 flex-1"></div>
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">OR</span>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>

            {/* Word Guess Form */}
            <form onSubmit={handleGuessWord} className="flex gap-2">
              <input
                type="text"
                placeholder="Guess the whole word or a letter"
                value={wordGuess}
                onChange={(e) => setWordGuess(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-white border-none outline-none text-gray-900 font-medium uppercase"
              />
              <button
                type="submit"
                className="bg-[#00E676] text-[#0b1b36] px-6 py-3 rounded-lg font-bold hover:bg-[#00C853] transition-colors"
              >
                Guess
              </button>
            </form>
          </div>
        )}

        {/* Progress Bar (Timer) */}
        <div className="flex items-center gap-3 mt-2">
          <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#00E676] h-full transition-all duration-1000 ease-linear"
              style={{ width: `${(timeLeft / maxTime) * 100}%` }}
            ></div>
          </div>
          <span className="text-gray-300 text-sm font-medium">{timeLeft}s</span>
        </div>

        <p className="text-center text-gray-400 text-xs mt-1">
          Right: +50 pts. Wrong: lose a life and 10 pts.
        </p>

        {/* Quit Button */}
        <button
          onClick={() => navigate('/home')}
          className="text-gray-400 text-sm hover:text-white transition-colors mt-2"
        >
          Quit game
        </button>

      </div>
      </div>
      </div>
  );
};

export default Game;
