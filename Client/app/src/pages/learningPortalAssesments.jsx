import React, { useState } from "react";

const assessments = [
  {
    id: 1,
    name: "Basic Cybersecurity Quiz",
    category: "Cybersecurity",
    difficulty: "Easy",
    author: "OmarW",
    questions: [
      {
        question: "What does CTF stand for?",
        options: ["Capture The Flag", "Cyber Task Force", "Computer Tech Forum", "Code The Future"],
        answer: "Capture The Flag",
      },
      {
        question: "Which of the following is a strong password?",
        options: ["123456", "password", "Qw!8x$P2d#", "admin"],
        answer: "Qw!8x$P2d#",
      },
      {
        question: "What is the main purpose of a firewall?",
        options: ["To store passwords", "To monitor and control network traffic", "To delete malware", "To speed up the internet"],
        answer: "To monitor and control network traffic",
      },
      {
        question: "Which protocol is used for secure communication over the internet?",
        options: ["HTTP", "FTP", "SSH", "Telnet"],
        answer: "SSH",
      },
    ],
  },
  {
    id: 2,
    name: "Network Security Challenge",
    category: "Networking",
    difficulty: "Medium",
    author: "Abdalhameed",
    questions: [
      {
        question: "What is the main purpose of a firewall?",
        options: ["To store passwords", "To monitor and control network traffic", "To delete malware", "To speed up the internet"],
        answer: "To monitor and control network traffic",
      },
      {
        question: "Which protocol is used for secure communication over the internet?",
        options: ["HTTP", "FTP", "SSH", "Telnet"],
        answer: "SSH",
      },
    ],
  },
];

export default function Assessments() {
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleCardClick = (assessment) => {
    setSelectedAssessment(assessment);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setScore(null);
  };

  const handleAnswerSelect = (option) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: option });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedAssessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    selectedAssessment.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Assessments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map((assessment) => (
          <div key={assessment.id} className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition" onClick={() => handleCardClick(assessment)}>
            <h2 className="text-xl font-semibold">{assessment.name}</h2>
            <p className="text-gray-600">Category: {assessment.category}</p>
            <p className="text-gray-600">Difficulty: {assessment.difficulty}</p>
            <p className="text-gray-600">Author: {assessment.author}</p>
          </div>
        ))}
      </div>

      {selectedAssessment && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">{selectedAssessment.name}</h2>
            {score === null ? (
              <>
                <p className="mb-4">{selectedAssessment.questions[currentQuestionIndex].question}</p>
                <div className="grid grid-cols-1 gap-2">
                  {selectedAssessment.questions[currentQuestionIndex].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(option)}
                      className={`p-2 rounded text-white ${selectedAnswers[currentQuestionIndex] === option ? "bg-yellow-500" : "bg-blue-500 hover:bg-blue-600"}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} className="p-2 bg-gray-400 text-white rounded">Previous</button>
                  {currentQuestionIndex < selectedAssessment.questions.length - 1 ? (
                    <button onClick={handleNextQuestion} className="p-2 bg-blue-500 text-white rounded">Next</button>
                  ) : (
                    <button onClick={handleSubmit} className="p-2 bg-green-500 text-white rounded">Submit</button>
                  )}
                </div>
              </>
            ) : (
              <h3 className="text-lg font-bold mt-4">Your Score: {score} / {selectedAssessment.questions.length}</h3>
            )}
            <button className="mt-4 p-2 bg-red-500 text-white rounded" onClick={() => setSelectedAssessment(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
