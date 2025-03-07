//Tailwind CSS
import React, { useState, useEffect } from "react";

const initialBoard = Array(9).fill(null);
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]
];

const questions = [
  { question: "What is Farah's (Media team) last name ?", options: ["Hammodeh", "Barakat", "Qamhawi", "Khanfar"], answer: "Qamhawi" },
  { question: "What is Omar's last name ?", options: ["Daradka", "Waggad", "Abu teir", "Shami"], answer: "Waggad" },
  { question: "What is Abdalhameed's last name ?", options: ["Waggad", "Daradkeh", "Abu teir", "Hammodeh"], answer: "Daradkeh" },
  { question: "What is Farah's (leader) last name ?", options: ["Hammodeh", "Barakat", "Messi", "Ronaldo"], answer: "Hammodeh" },
  { question: "What is Banan's last name ?", options: ["Barakat", "Qamhawi", "Khanfar", "Hammodeh"], answer: "Khanfar" },
  { question: "What is Yazeed's last name ?", options: ["Allabadi", "Waggad", "Daradkeh", "Shami"], answer: "Allabadi" },
  { question: "What is Lana's last name ?", options: ["Barakat", "Hammodeh", "Qamhawi", "Mehdawi"], answer: "Barakat" },
  { question: "What is Shahed's last name ?", options: ["Mehdawi", "Barakat", "Khanfar", "Qamhawi"], answer: "Mehdawi" },
  { question: "Which team is the best team ?", options: ["Dev", "Media", "Assessement", "Compliance"], answer: "Dev" },
];

export default function TicTacToe() {
  const [board, setBoard] = useState(initialBoard);
  const [isXTurn, setIsXTurn] = useState(true);
  const [selectedCell, setSelectedCell] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState([]);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (showModal) {
      setTimer(15);
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            const newBoard = [...board];
            newBoard[selectedCell] = isXTurn ? "O" : "X";
            setBoard(newBoard);
            checkWinner(newBoard);
            handleWrongAnswer();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [showModal]);

  const checkWinner = (board) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setWinningCells(combo);
        return;
      }
    }
    if (!board.includes(null)) {
      setWinner("Draw");
    }
  };

  const handleCellClick = (index) => {
    if (board[index] || winner) return;
    setSelectedCell(index);
    setCurrentQuestion(questions[index]);
    setShowModal(true);
  };

  const handleAnswer = (answer) => {
    const newBoard = [...board];
    if (answer === currentQuestion.answer) {
      newBoard[selectedCell] = isXTurn ? "X" : "O";
      setBoard(newBoard);
      checkWinner(newBoard);
    } else {
      newBoard[selectedCell] = isXTurn ? "O" : "X";
      setBoard(newBoard);
      checkWinner(newBoard);
    }
    handleCloseModal();
  };

  const handleWrongAnswer = () => {
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsXTurn(!isXTurn);
    setSelectedCell(null);
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setWinner(null);
    setWinningCells([]);
    setIsXTurn(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Tic-Tac-Toe Quiz</h1>
      {!winner && (
        <div className="text-2xl font-bold mb-4">
          {isXTurn ? "X's turn" : "O's turn"}
        </div>
      )}
      {winner && (
        <div className="text-xl font-bold mb-4 text-green-600">
          {winner === "Draw" ? "It's a draw!" : `${winner} wins!`}
        </div>
      )}
      <div className="grid grid-cols-3 gap-2 w-64">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            className={`w-20 h-20 text-2xl font-bold flex items-center justify-center border-2 rounded-lg
              ${winningCells.includes(index) ? "bg-green-300" : "bg-white"}`}
          >
            {cell || index + 1}
          </button>
        ))}
      </div>

      <button onClick={resetGame} className="mt-4 px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300">
      Reset Game
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">{currentQuestion.question}</h2>
            <p className="text-sm text-red-500">Time left: {timer}s</p>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}