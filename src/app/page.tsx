"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [duration, setDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showTimer && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && showTimer) {
      setGameOver(true);
      setWinner(getWinner());
    }

    return () => clearInterval(timer);
  }, [showTimer, timeLeft]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeLeft(duration * 60); // Convert minutes to seconds
    setShowTimer(true);
    setGameOver(false);
    setWinner(null);
  };

  const handlePlayClick = () => {
    setShowForm(true);
  };

  const handleAddTime = (additionalMinutes: number) => {
    setTimeLeft(prevTime => prevTime + additionalMinutes * 60);
    setGameOver(false);
    setWinner(null);
  };

  const handleIncreaseScore1 = () => {
    setScore1(prevScore => prevScore + 1);
  };

  const handleIncreaseScore2 = () => {
    setScore2(prevScore => prevScore + 1);
  };

  const handleEndGame = () => {
    setTimeLeft(0);
    setGameOver(true);
    setWinner(getWinner());
  };

  const getWinner = () => {
    if (score1 > score2) {
      return player1;
    } else if (score2 > score1) {
      return player2;
    } else {
      return "It's a tie!";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      {!showForm ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePlayClick}
          className="px-8 py-4 text-2xl font-bold text-white bg-green-500 rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-500"
        >
          Play
        </motion.button>
      ) : !showTimer ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
        >
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Player Details</h2>
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block mb-2 text-lg font-semibold text-gray-700">Player 1 Name</label>
              <input
                type="text"
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
                className="w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-semibold text-gray-700">Player 2 Name</label>
              <input
                type="text"
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
                className="w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-semibold text-gray-700">Choose Sender</label>
              <select
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Sender</option>
                <option value="player1">Player 1</option>
                <option value="player2">Player 2</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-lg font-semibold text-gray-700">Choose Receiver</label>
              <select
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                className="w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Receiver</option>
                <option value="player1">Player 1</option>
                <option value="player2">Player 2</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-lg font-semibold text-gray-700">Duration (minutes)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-4 py-2 text-lg font-bold text-white bg-green-500 rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-500"
            >
              Submit
            </motion.button>
          </motion.form>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center"
        >
          <h2 className="mb-4 text-2xl font-bold text-gray-800">{`${player1} vs ${player2}`}</h2>
          <div className="mb-4 text-xl font-semibold text-gray-700">{`Time Left: ${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`}</div>
          <div className="text-lg font-semibold text-gray-700">{`Sender: ${sender === 'player1' ? player1 : player2}`}</div>
          <div className="text-lg font-semibold text-gray-700">{`Receiver: ${receiver === 'player1' ? player1 : player2}`}</div>
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="w-24 text-lg font-bold text-gray-800 text-left">{player1}</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleIncreaseScore1}
                className="flex-grow px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-500"
              >
                Increase Score
              </motion.button>
              <span className="w-8 text-lg font-bold text-gray-800 text-right">{score1}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="w-24 text-lg font-bold text-gray-800 text-left">{player2}</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleIncreaseScore2}
                className="flex-grow px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-500"
              >
                Increase Score
              </motion.button>
              <span className="w-8 text-lg font-bold text-gray-800 text-right">{score2}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEndGame}
              className="w-full px-4 py-2 text-lg font-bold text-white bg-red-500 rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-500"
            >
              End Game
            </motion.button>
          </div>
          {gameOver && (
            <>
              <Confetti />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6"
              >
                <div className="mb-4 text-2xl font-bold text-red-600">Time Over</div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddTime(5)}
                  className="px-4 py-2 text-lg font-bold text-white bg-green-500 rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-500"
                >
                  Add 5 More Minutes
                </motion.button>
                <div className="mt-4 text-xl font-semibold text-gray-800">{`Winner: ${winner}`}</div>
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Home;
