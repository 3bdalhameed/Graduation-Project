// Enhanced LearningMaterials component with improved styling and API integration
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import useTokenStore from "../../stores/useTokenStore";
import { fetchLearningMaterials } from "../../api/learningMaterials";

export default function LearningMaterials() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = useTokenStore((state) => state.token);

  useEffect(() => {
    const loadMaterials = async () => {
      setIsLoading(true);
      try {
        const data = await fetchLearningMaterials(token);
        setMaterials(data);
      } catch (err) {
        console.error("Failed to fetch materials:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMaterials();
  }, [token]);

  const categories = [
    "All",
    "Introduction",
    "Web Security",
    "Digital Forensics",
    "Crypto",
    "Reverse Engineering",
    "Binary Exploitation",
  ];

  const filteredMaterials = selectedCategory === "All"
    ? materials
    : materials.filter((material) => material.category === selectedCategory);

  const categoryIcons = {
    "Introduction": { color: "blue", icon: "📘", gradient: "from-blue-500 to-indigo-500" },
    "Web Security": { color: "orange", icon: "🕸️", gradient: "from-orange-500 to-amber-500" },
    "Digital Forensics": { color: "purple", icon: "🔍", gradient: "from-purple-500 to-violet-500" },
    "Crypto": { color: "green", icon: "🔐", gradient: "from-green-500 to-emerald-500" },
    "Reverse Engineering": { color: "red", icon: "🔁", gradient: "from-red-500 to-pink-500" },
    "Binary Exploitation": { color: "blue", icon: "💥", gradient: "from-blue-500 to-cyan-500" }
  };

  const handleAnswerSelect = (option, questionIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: option });
  };

  const handleBack = () => {
    setSelectedMaterial(null);
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setScore(null);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < selectedMaterial.questions?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    if (!selectedMaterial?.questions) return 0;
    
    let correctCount = 0;
    selectedMaterial.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) correctCount++;
    });
    
    setScore(correctCount);
  };

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
        <aside className="w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 shadow-lg min-h-screen border-r border-gray-200 dark:border-gray-700 sticky top-16"> 
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center mt-4">
            <span className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3 text-blue-600 dark:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </span>
            Categories
          </h2>

          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`w-full py-2.5 px-4 rounded-xl text-left font-medium transition-all duration-300 flex items-center ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-600 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {selectedCategory === category && (
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
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 pt-12">
          <div className="max-w-6xl mx-auto">
            {/* Materials Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
            >
              Learning Materials Center
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 dark:text-gray-400 mb-8"
            >
              Explore curated content for cybersecurity and CTF training
            </motion.p>

            {/* Loading State */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMaterials.length > 0 ? (
                  filteredMaterials.map((material) => {
                    const categoryData = categoryIcons[material.category] || { 
                      color: "blue", 
                      icon: "📄", 
                      gradient: "from-blue-500 to-blue-600" 
                    };
                    
                    return (
                      <motion.div
                        key={material.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl 
                                  transition-all duration-300 border border-gray-200 dark:border-gray-700
                                  overflow-hidden cursor-pointer group"
                        onClick={() => setSelectedMaterial(material)}
                      >
                        {/* Top accent line with category-specific gradient */}
                        <div className={`h-1.5 bg-gradient-to-r ${categoryData.gradient}`}></div>
                        
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium 
                                            bg-${categoryData.color}-100 dark:bg-${categoryData.color}-900/30
                                            text-${categoryData.color}-700 dark:text-${categoryData.color}-300`}>
                              {material.category}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                              <span className="mr-1">{categoryData.icon}</span>
                            </span>
                          </div>

                          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {material.title}
                          </h2>

                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                            {material.description}
                          </p>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                              {material.questions?.length || 0} Questions
                            </span>
                            <span className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                              View Material
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 max-w-md mx-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 dark:text-blue-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No materials found</h3>
                      <p className="text-gray-600 dark:text-gray-400">No learning materials match your current category selection.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Material Viewer Modal */}
      <AnimatePresence>
        {selectedMaterial && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBack}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full shadow-2xl border dark:border-gray-700 overflow-hidden"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient based on category */}
              <div className={`bg-gradient-to-r ${categoryIcons[selectedMaterial.category]?.gradient || 'from-blue-600 to-indigo-600'} p-6 text-white`}>
                <button 
                  onClick={handleBack}
                  className="flex items-center text-sm text-blue-100 hover:text-white mb-4 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back to materials
                </button>
                <h1 className="text-2xl font-bold">{selectedMaterial.title}</h1>
                <div className="flex items-center mt-2 text-sm">
                  <span className="mr-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {selectedMaterial.category}
                  </span>
                  {selectedMaterial.questions?.length > 0 && (
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {selectedMaterial.questions.length} Questions
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                {/* Questions View */}
                {selectedMaterial.questions?.length > 0 ? (
                  <div>
                    {/* Progress Bar */}
                    {score === null && (
                      <>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mb-6 overflow-hidden">
                          <div 
                            className={`bg-gradient-to-r ${categoryIcons[selectedMaterial.category]?.gradient || 'from-blue-500 to-indigo-500'} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${((currentQuestionIndex + 1) / selectedMaterial.questions.length) * 100}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-6">
                          <span>Question {currentQuestionIndex + 1} of {selectedMaterial.questions.length}</span>
                          <span>{selectedAnswers[currentQuestionIndex] ? "Answered" : "Unanswered"}</span>
                        </div>
                        
                        {/* Question */}
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                            {selectedMaterial.questions[currentQuestionIndex].question}
                          </h3>
                          
                          {/* Answer Options */}
                          <div className="space-y-3">
                            {selectedMaterial.questions[currentQuestionIndex]?.options?.map((option, idx) => (
                              <div
                                key={idx}
                                onClick={() => handleAnswerSelect(option, currentQuestionIndex)}
                                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 relative overflow-hidden group
                                  ${
                                    selectedAnswers[currentQuestionIndex] === option
                                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20'
                                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/30 dark:hover:bg-blue-900/10'
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
                            onClick={prevQuestion}
                            disabled={currentQuestionIndex === 0}
                            className={`px-4 py-2 rounded-lg flex items-center transition-all
                              ${
                                currentQuestionIndex === 0
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
                          
                          {currentQuestionIndex === selectedMaterial.questions.length - 1 ? (
                            <button
                              onClick={calculateScore}
                              disabled={Object.keys(selectedAnswers).length < selectedMaterial.questions.length}
                              className={`px-6 py-2 rounded-lg font-medium transition-colors relative overflow-hidden
                                ${
                                  Object.keys(selectedAnswers).length === selectedMaterial.questions.length
                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                                }
                              `}
                            >
                              <span className="relative z-10 flex items-center">
                                Submit
                                <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none">
                                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                            </button>
                          ) : (
                            <button
                              onClick={nextQuestion}
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
                    )}
                    
                    {/* Score Results */}
                    {score !== null && (
                      <div className="text-center py-8">
                        <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 mx-auto mb-6 flex items-center justify-center">
                          <span className="text-3xl text-blue-600 dark:text-blue-400 font-bold">
                            {score}/{selectedMaterial.questions.length}
                          </span>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                          {score === selectedMaterial.questions.length 
                            ? "Perfect Score!" 
                            : score >= selectedMaterial.questions.length / 2 
                              ? "Well Done!" 
                              : "Keep Learning!"}
                        </h2>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                          {score === selectedMaterial.questions.length 
                            ? "You've mastered this material completely!" 
                            : score >= selectedMaterial.questions.length / 2 
                              ? "You've done well, but there's still room for improvement." 
                              : "Don't worry, keep studying and try again soon."}
                        </p>
                        
                        <div className="flex justify-center space-x-4">
                          <button
                            onClick={handleBack}
                            className="px-6 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors"
                          >
                            Back to Materials
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
                ) : (
                  <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown>{selectedMaterial.content || "No content available for this material."}</ReactMarkdown>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}