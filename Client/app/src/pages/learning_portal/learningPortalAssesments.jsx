import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useTokenStore from "../../stores/useTokenStore"; // at the top
import { fetchAssessments } from "../../api/assessments"; // top
import { submitSolvedAssessment } from "../../api/assessments";




export default function Assessments() {
  const [assessments, setAssessments] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [activeFilters, setActiveFilters] = useState({ category: "All", difficulty: "All" });
  const token = useTokenStore((state) => state.token);


  const difficultyStyles = {
    Easy: "bg-green-100 text-green-800 border border-green-300",
    Medium: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    Hard: "bg-red-100 text-red-800 border border-red-300"
  };
  
  const categoryIcons = {
    Knowledge: {
      color: "blue",
      icon: "🛡️",
    },
    Behavior: {
      color: "green",
      icon: "🌐",
    },
    Attitude: {
      color: "purple",
      icon: "🔐",
    },
    "Web Security": {
      color: "orange",
      icon: "🕸️",
    },
  };
  // Map difficulty to colors
const difficultyColors = {
  Easy: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-400",
    border: "border-green-200 dark:border-green-800/30",
    gradient: "from-green-500 to-emerald-500"
  },
  Medium: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30", 
    text: "text-yellow-700 dark:text-yellow-400",
    border: "border-yellow-200 dark:border-yellow-800/30",
    gradient: "from-yellow-500 to-amber-500"
  },
  Hard: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-200 dark:border-red-800/30",
    gradient: "from-red-500 to-orange-500"
  }
};

  useEffect(() => {
    if (!token) return;
    fetchAssessments(token)
      .then((data) => {
        const normalized = data.map((assessment) => ({
          ...assessment,
          questions: assessment.questions.map((q) => ({
            ...q,
            options: [q.option1, q.option2, q.option3, q.option4].filter(Boolean),
          })),
        }));
        setAssessments(normalized);
      })
      .catch((err) => console.error("Failed to fetch assessments", err));
  }, [token]);

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

  const handleSubmit = async () => {
    let correctAnswers = 0;
    selectedAssessment.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    try {
      await submitSolvedAssessment({
        assessment: selectedAssessment?.id,
        score: correctAnswers,
      }, token);
    } catch (err) {
      console.error("Error submitting result:", err.message);
    }
  };

  const handleBackToList = () => {
    setSelectedAssessment(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setScore(null);
  };

  const applyFilters = (challenges) => {
    if (!Array.isArray(challenges)) return [];
    return challenges.filter((challenge) => {
      const matchesCategory =
        activeFilters.category === "All" || challenge.category === activeFilters.category;
      const matchesDifficulty =
        activeFilters.difficulty === "All" || challenge.difficulty === activeFilters.difficulty;
      return matchesCategory && matchesDifficulty;
    });
  };

  const filteredAssessments = applyFilters(assessments);
  const totalQuestions = selectedAssessment?.questions?.length || 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const allQuestionsAnswered = selectedAssessment &&
    Object.keys(selectedAnswers).length === selectedAssessment.questions.length;


    return (
      <div className="min-h-screen relative">
        {/* Background with subtle patterns and gradients */}
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 -z-10">
          {/* Grid background */}
          <div className="absolute inset-0 bg-grid bg-[length:30px_30px] opacity-[0.03] dark:opacity-[0.02]"></div>
          
          {/* Background gradient circles for visual interest */}
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-0 w-72 h-72 bg-indigo-100/30 dark:bg-purple-900/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="flex z-10 relative pt-16"> {/* Added pt-16 for navbar space */}
          {/* Sidebar */}
          <aside className="w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 shadow-lg min-h-screen border-r border-gray-200 dark:border-gray-700 sticky top-16"> {/* Changed to sticky top-16 for navbar */}
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center mt-4"> {/* Added mt-4 for better spacing */}
              <span className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3 text-blue-600 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              </span>
              Filter Assessments
            </h2>
  
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400 uppercase tracking-wider">Category</h3>
              <div className="space-y-2">
                {["All", "Knowledge", "Behavior", "Attitude"].map((category) => (
                  <button
                    key={category}
                    className={`w-full py-2.5 px-4 rounded-xl text-left font-medium transition-all duration-300 flex items-center ${
                      activeFilters.category === category
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-600 text-white shadow-md"
                        : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setActiveFilters((prev) => ({ ...prev, category }))}
                  >
                    {activeFilters.category === category && (
                      <span className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                    )}
                    {category !== "All" && categoryIcons[category] && (
                      <span className="mr-2">{categoryIcons[category].icon}</span>
                    )}
                    {category}
                  </button>
                ))}
              </div>
            </div>
  
            {/* Difficulty Filter */}
            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400 uppercase tracking-wider">Difficulty</h3>
              <div className="space-y-2">
                {["All", "Easy", "Medium", "Hard"].map((difficulty) => (
                  <button
                    key={difficulty}
                    className={`w-full py-2.5 px-4 rounded-xl text-left font-medium transition-all duration-300 flex items-center ${
                      activeFilters.difficulty === difficulty
                        ? difficulty !== "All"
                          ? `bg-gradient-to-r ${difficultyColors[difficulty]?.gradient} text-white shadow-md`
                          : "bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-600 text-white shadow-md"
                        : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setActiveFilters((prev) => ({ ...prev, difficulty }))}
                  >
                    {activeFilters.difficulty === difficulty && (
                      <span className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                    )}
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </aside>
  
          {/* Main Content */}
          <main className="flex-1 p-8 pt-12"> {/* Changed from pt-24 to pt-12 to work with parent pt-16 */}
            <div className="max-w-6xl mx-auto">
              {/* Assessment List */}
              {!selectedAssessment && (
                <>
                  <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
                  >
                    Skills Assessment Center
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-600 dark:text-gray-400 mb-8"
                  >
                    Test your knowledge and skills with our interactive assessments and quizzes
                  </motion.p>

  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAssessments.map((assessment) => {
                      const categoryData = categoryIcons[assessment.category] || { color: "blue", icon: "📝" };
                      const difficultyData = difficultyColors[assessment.difficulty] || difficultyColors.Medium;
                      
                      return (
                        <motion.div
                          key={assessment.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          whileHover={{ y: -5 }}
                          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl 
                                    transition-all duration-300 border border-gray-200 dark:border-gray-700
                                    overflow-hidden cursor-pointer group"
                          onClick={() => handleCardClick(assessment)}
                        >
                          {/* Top accent line */}
                          <div className={`h-1.5 bg-gradient-to-r ${difficultyData.gradient}`}></div>
                          
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyData.bg} ${difficultyData.text}`}>
                                {assessment.difficulty}
                              </span>
                              
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                              bg-${categoryData.color}-100 dark:bg-${categoryData.color}-900/30 
                                              text-${categoryData.color}-700 dark:text-${categoryData.color}-300`}>
                                <span className="mr-1">{categoryData.icon}</span>
                                {assessment.category}
                              </span>
                            </div>
                            
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {assessment.name}
                            </h2>
                            
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                              {assessment.description}
                            </p>
                            
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500 dark:text-gray-400 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {assessment.author}
                              </span>
                              <span className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                                Start Quiz
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
  
                  {filteredAssessments.length === 0 && (
                    <div className="text-center py-12">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 max-w-md mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 dark:text-blue-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No assessments found</h3>
                        <p className="text-gray-600 dark:text-gray-400">No assessments match your current filter criteria. Try adjusting your filters.</p>
                      </div>
                    </div>
                  )}
                </>
              )}
  
              {/* Selected Assessment */}
              {selectedAssessment && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Assessment Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 p-6 text-white">
                    <button 
                      onClick={handleBackToList}
                      className="flex items-center text-sm text-blue-100 hover:text-white mb-4 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Back to assessments
                    </button>
                    <h1 className="text-2xl font-bold">{selectedAssessment.name}</h1>
                    <div className="flex items-center mt-2 text-sm">
                      <span className="mr-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {selectedAssessment.category}
                      </span>
                      <span className="mr-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {selectedAssessment.difficulty}
                      </span>
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {selectedAssessment.questions.length} Questions
                      </span>
                    </div>
                  </div>
                  
                  {/* Assessment Content */}
                  <div className="p-6">
                    {score === null ? (
                      <>
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mb-6 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-6">
                          <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                          <span>{selectedAnswers[currentQuestionIndex] ? "Answered" : "Unanswered"}</span>
                        </div>
                        
                        {/* Question */}
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                            {selectedAssessment.questions[currentQuestionIndex].question}
                          </h3>
                          
                          {/* Answer Options */}
                          <div className="space-y-3">
                          {selectedAssessment.questions[currentQuestionIndex]?.options?.map((option, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleAnswerSelect(option)}
                              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 relative overflow-hidden group
                                ${
                                  selectedAnswers[currentQuestionIndex] === option
                                    ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20"
                                    : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/30 dark:hover:bg-blue-900/10"
                                }
                              `}
                            >
                                {/* Subtle hover effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                                </div>
                                
                                <div className="flex items-center">
                                  <div className={`w-5 h-5 mr-3 rounded-full flex-shrink-0 border transition-colors
                                    ${
                                      selectedAnswers[currentQuestionIndex] === option
                                        ? "border-blue-500 bg-blue-500"
                                        : "border-gray-300 dark:border-gray-600"
                                    }
                                  `}>
                                    {selectedAnswers[currentQuestionIndex] === option && (
                                      <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    )}
                                  </div>
                                  <span className="text-gray-800 dark:text-gray-200">{option}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8">
                          <button
                            onClick={handlePreviousQuestion}
                            disabled={isFirstQuestion}
                            className={`px-4 py-2 rounded-lg flex items-center transition-all
                              ${
                                isFirstQuestion
                                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
                              }
                            `}
                          >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Previous
                          </button>
                          
                          {isLastQuestion ? (
                            <button
                              onClick={handleSubmit}
                              disabled={!allQuestionsAnswered}
                              className={`px-6 py-2 rounded-lg font-medium transition-colors relative overflow-hidden
                                ${
                                  allQuestionsAnswered
                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                                }
                              `}
                            >
                              {allQuestionsAnswered && (
                                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700">
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-shimmer"></div>
                                </div>
                              )}
                              <span className="relative z-10 flex items-center">
                                Submit
                                <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none">
                                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                            </button>
                          ) : (
                            <button
                              onClick={handleNextQuestion}
                              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-md relative overflow-hidden group"
                            >
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                              </div>
                              <span className="relative z-10 flex items-center">
                                Next
                                <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none">
                                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                            </button>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 mx-auto mb-6 flex items-center justify-center">
                          <span className="text-3xl text-blue-600 dark:text-blue-400 font-bold">
                            {score}/{selectedAssessment.questions.length}
                          </span>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                          {score === selectedAssessment.questions.length 
                            ? "Perfect Score!" 
                            : score >= selectedAssessment.questions.length / 2 
                              ? "Well Done!" 
                              : "Keep Practicing!"}
                        </h2>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                          {score === selectedAssessment.questions.length 
                            ? "You've mastered this assessment completely!" 
                            : score >= selectedAssessment.questions.length / 2 
                              ? "You've done well, but there's still room for improvement." 
                              : "Don't worry, keep learning and try again soon."}
                        </p>
                        
                        <div className="flex justify-center space-x-4">
                          <button
                            onClick={handleBackToList}
                            className="px-6 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors"
                          >
                            Back to Assessments
                          </button>
                          
                          <button
                            onClick={() => {
                              setCurrentQuestionIndex(0);
                              setSelectedAnswers({});
                              setScore(null);
                            }}
                            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-md transition-colors"
                          >
                            Try Again
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    );
}
