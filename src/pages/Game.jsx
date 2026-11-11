import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/b.jpeg";
import { fetchPuzzle } from '../services/bananaApi';

const Game = () => {
  const navigate = useNavigate();

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [timeLeft, setTimeLeft] = useState(45);
  const maxTime = 45;

  const [category] = useState('Famous Fruit');
  const [targetWord] = useState('BANANA');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [isPuzzleVisible, setIsPuzzleVisible] = useState(false);

  const [puzzleAnswer, setPuzzleAnswer] = useState('');
  const [wordGuess, setWordGuess] = useState('');

  const [puzzleImage, setPuzzleImage] = useState('');
  const [puzzleSolution, setPuzzleSolution] = useState(null);
  const [isLoadingPuzzle, setIsLoadingPuzzle] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleGameOver("Time's up!");
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  useEffect(() => {
    const uniqueLetters = [...new Set(targetWord.split(''))];
    const randomLetter = uniqueLetters[Math.floor(Math.random() * uniqueLetters.length)];
    setGuessedLetters([randomLetter]);

    loadNewPuzzle();
  }, [targetWord]);

  const loadNewPuzzle = async () => {
    setIsLoadingPuzzle(true);
    setApiError(null);
    try {
      const data = await fetchPuzzle();
      setPuzzleImage(data.image);
      setPuzzleSolution(data.solution);
    } catch (error) {
      setApiError("Could not load puzzle. Please check your connection or retry.");
    } finally {
      setIsLoadingPuzzle(false);
    }
  };

  const handleCheckPuzzle = (e) => {
    e.preventDefault();

    if (parseInt(puzzleAnswer) === puzzleSolution) {
      revealRandomLetter();
      setScore(score + 10);
      loadNewPuzzle(); 
    } else {
      alert("Wrong math answer! Try again.");
    }
    setPuzzleAnswer('');
    setIsPuzzleVisible(false);
  };

  const handleGuessWord = (e) => {
    e.preventDefault();
    const guess = wordGuess.toUpperCase().trim();
    if (!guess) return;

    if (guess === targetWord) {
      handleWin();
    }
    else if (guess.length === 1 && targetWord.includes(guess)) {
      if (!guessedLetters.includes(guess)) {
        const newGuessed = [...guessedLetters, guess];
        setGuessedLetters(newGuessed);
        setScore(score + 10);
        checkIfWordComplete(newGuessed);
      }
    }
    else {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives === 0) handleGameOver("Out of lives!");
    }
    setWordGuess('');
  };

  const revealRandomLetter = () => {
    const remainingLetters = targetWord.split('').filter(l => !guessedLetters.includes(l));
    if (remainingLetters.length > 0) {
      const uniqueRemaining = [...new Set(remainingLetters)];
      const randomLetter = uniqueRemaining[Math.floor(Math.random() * uniqueRemaining.length)];
      const newGuessed = [...guessedLetters, randomLetter];
      setGuessedLetters(newGuessed);
      checkIfWordComplete(newGuessed);
    }
  };

  const checkIfWordComplete = (letters) => {
    const allRevealed = targetWord.split('').every(letter => letters.includes(letter));
    if (allRevealed) handleWin();
  };

  const submitScoreToDatabase = async (finalScore) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await fetch('http://localhost:5000/api/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ score: finalScore })
      });
    } catch (error) {
      console.error("Failed to save score:", error);
    }
  };

  const handleWin = async () => {
    await submitScoreToDatabase(score + 50);
    setTimeout(() => {
      alert(`Congratulations! You revealed the word: ${targetWord}`);
      navigate('/home');
    }, 300);
  };

  const handleGameOver = async (reason) => {
    await submitScoreToDatabase(score); 
    alert(`Game Over: ${reason}`);
    navigate('/home');
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative font-sans bg-contain bg-center bg-no-repeat bg-[#0f172a]"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-5xl p-8 gap-12 md:gap-0">

        <div className="relative z-10 w-full max-w-[500px] bg-[#0b1b36] rounded-3xl ml-120 p-6 shadow-2xl flex flex-col gap-5 border border-white/10">

          <div className="flex justify-between items-center text-sm font-semibold">
            <div className="text-gray-300">Round 1/5</div>
            <div className="text-red-500 tracking-widest text-lg">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < lives ? "opacity-100" : "opacity-20"}>♥</span>
              ))}
            </div>
            <div className="text-[#FFD93D] text-lg">{score} pts</div>
          </div>

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

          {isPuzzleVisible ? (
            <div className="animate-fade-in flex flex-col gap-3">
              <div className="w-full bg-white rounded-xl overflow-hidden shadow-lg p-1 min-h-[150px] flex items-center justify-center relative">
                {isLoadingPuzzle ? (
                  <div className="text-gray-500 font-medium animate-pulse">Loading puzzle...</div>
                ) : apiError ? (
                  <div className="text-red-500 font-medium text-center px-4 flex flex-col items-center">
                    <span>{apiError}</span>
                    <button onClick={loadNewPuzzle} className="mt-2 text-sm bg-gray-200 px-3 py-1 rounded">Retry</button>
                  </div>
                ) : (
                  <img src={puzzleImage} alt="Puzzle" className="w-full h-auto rounded-lg" crossOrigin="anonymous" />
                )}
              </div>

              <form onSubmit={handleCheckPuzzle} className="flex gap-2">
                <input
                  type="number"
                  placeholder="Missing number"
                  value={puzzleAnswer}
                  onChange={(e) => setPuzzleAnswer(e.target.value)}
                  required
                  disabled={isLoadingPuzzle || !!apiError}
                  className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 font-medium disabled:bg-gray-300"
                />
                <button type="submit" disabled={isLoadingPuzzle || !!apiError} className="bg-[#a68a3e] text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50">
                  Check
                </button>
                <button type="button" onClick={() => setIsPuzzleVisible(false)} className="bg-gray-600 text-white px-4 py-3 rounded-lg font-bold">
                  X
                </button>
              </form>
            </div>
          ) : (
            <div className="animate-fade-in flex flex-col gap-4">
              <button onClick={() => setIsPuzzleVisible(true)} className="w-full bg-[#152c52] text-[#FFD93D] border border-[#FFD93D]/30 py-3 rounded-lg font-bold flex justify-center items-center gap-2">
                🍌 Solve Puzzle to Reveal a Letter
              </button>

              <div className="flex items-center gap-4">
                <div className="h-px bg-white/10 flex-1"></div>
                <span className="text-gray-500 text-xs font-medium uppercase">OR</span>
                <div className="h-px bg-white/10 flex-1"></div>
              </div>

              <form onSubmit={handleGuessWord} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Guess word or letter"
                  value={wordGuess}
                  onChange={(e) => setWordGuess(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 font-medium uppercase"
                />
                <button type="submit" className="bg-[#00E676] text-[#0b1b36] px-6 py-3 rounded-lg font-bold">
                  Guess
                </button>
              </form>
            </div>
          )}

          <div className="flex items-center gap-3 mt-2">
            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ease-linear ${timeLeft < 10 ? 'bg-red-500' : 'bg-[#00E676]'}`}
                style={{ width: `${(timeLeft / maxTime) * 100}%` }}
              ></div>
            </div>
            <span className={`text-sm font-medium ${timeLeft < 10 ? 'text-red-500' : 'text-gray-300'}`}>{timeLeft}s</span>
          </div>

          <button onClick={() => navigate('/home')} className="text-gray-400 text-sm hover:text-white mt-2">
            Quit game
          </button>

        </div>
      </div>
    </div>
  );
};

export default Game;
