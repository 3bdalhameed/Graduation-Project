import React, { useState, useEffect } from "react";
import Navbar from "../../components/learning_Navbar_logon/navbar";

export default function Assessments() {
  const [assessments, setAssessments] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    category: "All",
    difficulty: "All",
  });
  const [isAdmin, setIsAdmin] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [mcqList, setMcqList] = useState([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/assessments/")
      .then((res) => res.json())
      .then((data) => setAssessments(data))
      .catch((err) => console.error("Failed to fetch assessments", err));
  }, []);

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

  const handleMcqChange = (index, field, value) => {
    const updated = [...mcqList];
    if (field === "question" || field === "answer") {
      updated[index][field] = value;
    } else {
      updated[index].options[field] = value;
    }
    setMcqList(updated);
  };

  const addMcq = () => {
    setMcqList([...mcqList, { question: "", options: ["", "", "", ""], answer: "" }]);
  };

  return (
    <>
      {selectedAssessment && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
              📝 {selectedAssessment.name}
            </h2>
            {selectedAssessment.questions.length > 0 && (
              <>
                <p className="text-gray-800 dark:text-white mb-4">
                  {selectedAssessment.questions[currentQuestionIndex].question}
                </p>
                <div className="space-y-2 mb-4">
                  {["option1", "option2", "option3", "option4"].map((optKey, idx) => (
                    <button
                      key={idx}
                      className={`w-full text-left p-2 rounded-lg border ${
                        selectedAnswers[currentQuestionIndex] === selectedAssessment.questions[currentQuestionIndex][optKey]
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
                      }`}
                      onClick={() => handleAnswerSelect(selectedAssessment.questions[currentQuestionIndex][optKey])}
                    >
                      {selectedAssessment.questions[currentQuestionIndex][optKey]}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mb-4">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    ← Previous
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === selectedAssessment.questions.length - 1}
                  >
                    Next →
                  </button>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                >
                  ✅ Submit
                </button>
                {score !== null && (
                  <p className="mt-4 text-lg font-bold text-center text-green-600">
                    Your Score: {score} / {selectedAssessment.questions.length}
                  </p>
                )}
              </>
            )}
            <button
              className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
              onClick={() => setSelectedAssessment(null)}
            >
              ✖ Close
            </button>
          </div>
        </div>
      )}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-3xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
              ➕ Create New Assessment (MCQ)
            </h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                const assessmentName = e.target[0].value;
                const category = e.target[1].value;
                const difficulty = e.target[2].value;

                const payload = {
                  name: assessmentName,
                  category,
                  difficulty,
                  questions: mcqList.map((q) => {
  return {
    question: q.question,
    option1: q.options[0] || "",
    option2: q.options[1] || "",
    option3: q.options[2] || "",
    option4: q.options[3] || "",
    answer: q.answer,
  };
}),
                };

                fetch("http://127.0.0.1:8000/api/assessments/", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                  },
                  body: JSON.stringify(payload),
                })
                  .then((res) => {
                    if (!res.ok) throw new Error("Failed to create assessment");
                    return res.json();
                  })
                  .then((data) => {
                    setAssessments((prev) => [...prev, data]);
                    setShowCreateModal(false);
                  })
                  .catch((err) => alert(err.message));
              }} className="space-y-4">
              <input type="text" placeholder="Assessment Name" className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white border" />
              <input type="text" placeholder="Category (e.g., Cybersecurity)" className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white border" />
              <select className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white border">
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              <h3 className="text-lg font-semibold text-gray-700 dark:text-white">MCQ Questions</h3>
              {mcqList.map((mcq, index) => (
                <div key={index} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl mb-4 space-y-2">
                  <input
                    type="text"
                    placeholder={`Question ${index + 1}`}
                    value={mcq.question}
                    onChange={(e) => handleMcqChange(index, "question", e.target.value)}
                    className="w-full p-2 rounded-lg bg-white dark:bg-gray-700 dark:text-white border"
                  />
                  {mcq.options.map((opt, optIndex) => (
                    <input
                      key={optIndex}
                      type="text"
                      placeholder={`Option ${optIndex + 1}`}
                      value={opt}
                      onChange={(e) => handleMcqChange(index, optIndex, e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-gray-700 dark:text-white border"
                    />
                  ))}
                  <input
                    type="text"
                    placeholder="Correct Answer"
                    value={mcq.answer}
                    onChange={(e) => handleMcqChange(index, "answer", e.target.value)}
                    className="w-full p-2 rounded-lg bg-white dark:bg-gray-700 dark:text-white border"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addMcq}
                className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                ➕ Add Question
              </button>

              <div className="flex justify-between gap-4 mt-4">
                <button
                  type="button"
                  className="w-full py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white"
                  onClick={() => setShowCreateModal(false)}
                >
                  ✖ Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                >
                  💾 Save Assessment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Navbar />
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <aside className="w-64 bg-white dark:bg-gray-800 p-6 shadow-lg min-h-screen">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Filters</h2>
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
          {isAdmin && (
            <div className="mt-6">
              <button
                className="w-full py-2 px-4 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
                onClick={() => setShowCreateModal(true)}
              >
                ➕ Create Assessment
              </button>
            </div>
          )}
        </aside>

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