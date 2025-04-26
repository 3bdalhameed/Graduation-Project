import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/navbar";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function LearningMaterials() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/learning-materials/")
      .then((res) => res.json())
      .then((data) => setMaterials(data))
      .catch((err) => console.error("Failed to fetch materials", err));
  }, []);

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
    "Introduction": { color: "gray", icon: "📘" },
    "Web Security": { color: "orange", icon: "🕸️" },
    "Digital Forensics": { color: "purple", icon: "🔍" },
    "Crypto": { color: "green", icon: "🔐" },
    "Reverse Engineering": { color: "red", icon: "🔁" },
    "Binary Exploitation": { color: "blue", icon: "💥" }
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

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen pt-20">
        {/* Background with subtle patterns and gradients */}
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 -z-10">
          {/* Grid background */}
          <div className="absolute inset-0 bg-grid bg-[length:30px_30px] opacity-[0.03] dark:opacity-[0.02]"></div>
          
          {/* Background gradient circles for visual interest */}
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-0 w-72 h-72 bg-indigo-100/30 dark:bg-purple-900/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="flex">
          <aside className="w-64 min-h-screen bg-white dark:bg-gray-800 p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-2 border-blue-500">Categories</h2>
            <div className="space-y-3">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`w-full py-2 px-4 rounded-xl text-left font-semibold tracking-wide transition duration-200 ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </aside>

          <main className="flex-1 p-8 pt-12">
            <div className="max-w-6xl mx-auto">
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
                Explore curated content for cybersecurity and CTF training.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMaterials.map((material) => {
                  const categoryData = categoryIcons[material.category] || { color: "blue", icon: "📄" };

                  return (
                    <motion.div
                      key={material.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -5 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer group"
                      onClick={() => setSelectedMaterial(material)}
                    >
                      <div className={`h-1.5 bg-gradient-to-r from-${categoryData.color}-400 to-${categoryData.color}-600`} />
                      
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${categoryData.color}-100 dark:bg-${categoryData.color}-900/30 text-${categoryData.color}-700 dark:text-${categoryData.color}-300`}>
                            <span className="mr-1">{categoryData.icon}</span>
                            {material.category}
                          </span>
                        </div>

                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {material.title}
                        </h2>

                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                          {material.description}
                        </p>

                        <div className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
                          Read More →
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </main>
        </div>

        {/* Popup view */}
        <AnimatePresence>
          {selectedMaterial && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBack}
            >
              <motion.div
                className="bg-white dark:bg-gray-900 p-6 rounded-xl max-w-5xl w-full shadow-2xl border dark:border-gray-700 overflow-y-auto max-h-[90vh]"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-sm text-blue-500 hover:underline mb-4 cursor-pointer" onClick={handleBack}>
                  ← Back to materials
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedMaterial.title}
                </h2>
                <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                  <span>📂 {selectedMaterial.category}</span>
                  {selectedMaterial.questions?.length > 0 && <span>🧠 {selectedMaterial.questions.length} Questions</span>}
                </div>

                {selectedMaterial.questions && selectedMaterial.questions.length > 0 ? (
                  <>
                    <div className="text-gray-800 dark:text-white font-semibold mb-2">
                      Question {currentQuestionIndex + 1} of {selectedMaterial.questions.length}
                    </div>
                    <div className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      {selectedMaterial.questions[currentQuestionIndex].question}
                    </div>
                    <div className="space-y-3">
                      {selectedMaterial.questions[currentQuestionIndex].options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleAnswerSelect(opt, currentQuestionIndex)}
                          className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                            selectedAnswers[currentQuestionIndex] === opt
                              ? 'bg-blue-100 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300'
                              : 'hover:bg-blue-50 dark:hover:bg-blue-900/10 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown>{selectedMaterial.content || "No content available."}</ReactMarkdown>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
