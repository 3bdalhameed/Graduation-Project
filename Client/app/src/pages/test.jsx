import React, { useState } from "react";
import img1 from "./img/image1.png";
import img2 from "./img/image2.png";
import img3 from "./img/image3.png";
import img4 from "./img/image4.png";
import Navbar from "../components/Navbar_logon/navbar";
const quizData = [
  {
    image: img1,
    answer: "phishing",
    explanation: "The sender's email looks suspicious and asks for sensitive information such as email, password."
  },
  {
    image: img2,
    answer: "legitimate",
    explanation: "This email comes from an official domain and does not ask for sensitive information."
  },
  {
    image: img3,
    answer: "phishing",
    explanation: "The email appears as though the recipient received money and asks to click on a link to accept money, which is untrusted."
  },
  {
    image: img4,
    answer: "phishing",
    explanation: "The sender's email looks suspicious."
  }
];

function PhishingQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];

  const checkAnswer = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.answer) {
      setFeedback(`Correct! ${currentQuestion.explanation}`);
      setScore(score + 1);
    } else {
      setFeedback(`Wrong! ${currentQuestion.explanation}`);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setFeedback("");
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setFeedback("");
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <>
      
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-6">Quiz Completed!</h1>
        <p className="text-xl mb-4">Your final score is: {score} / {quizData.length}</p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={restartQuiz}
        >
          Try Again
        </button>
      </div>
      </>
    );
  }

  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Can You Spot the Phishing Email?</h1>
        <p className="mb-4">Analyze the email below and decide whether it's phishing or legitimate.</p>

        <div className="mb-6">
          <img src={currentQuestion.image} alt="Quiz Email" className="w-full rounded-md shadow-md" />
        </div>

        <div className="flex gap-4 mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => checkAnswer("phishing")}
          >
            Phishing
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => checkAnswer("legitimate")}
          >
            Legitimate
          </button>
        </div>

        {feedback && (
          <p className={`text-lg font-bold mb-4 ${feedback.startsWith("Correct") ? "text-green-600" : "text-red-600"}`}>
            {feedback}
          </p>
        )}

        {feedback && (
          <button
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
            onClick={nextQuestion}
          >
            Next
          </button>
        )}

        <p className="mt-6 text-xl">Score: {score}</p>
      </div>
    </div>
    </>
  );
}

export default PhishingQuiz;
