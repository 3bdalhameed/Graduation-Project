import React, { useState } from "react";
import Navbar from "../../components/learning_Navbar_logon/navbar";

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
  {
    id: 3,
    name: "Cryptography Basics",
    category: "Cryptography",
    difficulty: "Hard",
    author: "Prof. Iman Almomani",
    questions: [
      {
        question: "What is the main purpose of a hash function?",
        options: ["Encrypt data", "Compress data", "Generate a fixed-length output", "Create a random key"],
        answer: "Generate a fixed-length output",
      },
      {
        question: "Which encryption algorithm is considered the strongest?",
        options: ["AES-256", "DES", "MD5", "SHA-1"],
        answer: "AES-256",
      },
    ],
  },
  {
    id: 4,
    name: "Web Security Quiz",
    category: "Web Security",
    difficulty: "Easy",
    author: "Omar",
    questions: [
      {
        question: "What is SQL Injection?",
        options: ["A method to secure databases", "An attack on database queries", "A way to optimize SQL queries", "A form of network protection"],
        answer: "An attack on database queries",
      },
      {
        question: "What does XSS stand for?",
        options: ["Extended Secure Sockets", "Cross-Site Scripting", "Extra Secure Storage", "XML Security Standard"],
        answer: "Cross-Site Scripting",
      },
    ],
  },
];

export default function Assessments() {
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    category: "All",
    difficulty: "All",
  });

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

  const applyFilters = (challenges) => {
    return challenges.filter((challenge) => {
      const matchesCategory =
        activeFilters.category === "All" || challenge.category === activeFilters.category;
      const matchesDifficulty =
        activeFilters.difficulty === "All" || challenge.difficulty === activeFilters.difficulty;
      return matchesCategory && matchesDifficulty;
    });
  };

  const filteredAssessments = applyFilters(assessments);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 p-6 shadow-lg min-h-screen">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Filters</h2>

          {/* Category Filter */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Category</h3>
            {["All", "Cybersecurity", "Networking", "Cryptography", "Web Security"].map((category) => (
              <button
                key={category}
                className={`w-full py-2 px-4 rounded text-left mb-1 ${
                  activeFilters.category === category ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400"
                }`}
                onClick={() => setActiveFilters((prev) => ({ ...prev, category }))}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Difficulty</h3>
            {["All", "Easy", "Medium", "Hard"].map((difficulty) => (
              <button
                key={difficulty}
                className={`w-full py-2 px-4 rounded text-left mb-1 ${
                  activeFilters.difficulty === difficulty ? "bg-green-500 text-white" : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400"
                }`}
                onClick={() => setActiveFilters((prev) => ({ ...prev, difficulty }))}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Assessments</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssessments.map((assessment) => (
              <div
                key={assessment.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
                onClick={() => handleCardClick(assessment)}
              >
                <h2 className="text-xl font-semibold">{assessment.name}</h2>
                <p className="text-gray-600">Category: {assessment.category}</p>
                <p className="text-gray-600">Difficulty: {assessment.difficulty}</p>
                <p className="text-gray-600">Author: {assessment.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
