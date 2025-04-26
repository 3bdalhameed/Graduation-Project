import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import useTokenStore from "../../stores/useTokenStore";
import { fetchChallenges, fetchSolvedChallenges, submitFlag } from "../../api/challenges";



const ChallengePage = () => {
  const [challenges, setChallenges] = useState([]);
  const [solvedChallenges, setSolvedChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [flag, setFlag] = useState("");
  const [message, setMessage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const token = useTokenStore((state) => state.token);
  const [activeFilters, setActiveFilters] = useState({ category: "All", points: "All" });


  const pointColors = (points) => {
    if (points <= 100) {
      return {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-700 dark:text-green-400",
        border: "border-green-200 dark:border-green-800/30",
        gradient: "from-green-500 to-emerald-500"
      };
    } else if (points <= 350) {
      return {
        bg: "bg-yellow-100 dark:bg-yellow-900/30",
        text: "text-yellow-700 dark:text-yellow-400",
        border: "border-yellow-200 dark:border-yellow-800/30",
        gradient: "from-yellow-500 to-amber-500"
      };
    } else {
      return {
        bg: "bg-red-100 dark:bg-red-900/30",
        text: "text-red-700 dark:text-red-400",
        border: "border-red-200 dark:border-red-800/30",
        gradient: "from-red-500 to-orange-500"
      };
    }
  };

  useEffect(() => {
    fetchChallenges(token)
      .then((data) => {
        setChallenges(data);
        const uniqueCategories = [
          "All",
          ...new Set(data.map((challenge) => challenge.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching challenges:", error));

    fetchSolvedChallenges(token)
      .then((data) => setSolvedChallenges(data.map((challenge) => challenge.id)))
      .catch((error) => console.error("Error fetching solved challenges:", error));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!selectedChallenge) return;

    try {
      const data = await submitFlag(selectedChallenge.id, flag, token);
      if (data && !data.error) {
        setMessage(data.message);
        setSolvedChallenges([...solvedChallenges, selectedChallenge.id]);
      } else {
        setMessage("Incorrect flag or submission failed.");
      }
    } catch (err) {
      setMessage("An error occurred while submitting the flag.");
    }
  };

  const applyFilters = (challenges) => {
    if (!Array.isArray(challenges)) return [];
    return challenges.filter((challenge) => {
      const matchesCategory =
        activeFilters.category === "All" || challenge.category === activeFilters.category;
  
      const matchesPoints =
        activeFilters.points === "All" ||
        (activeFilters.points === "Easy" && challenge.points <= 100) ||
        (activeFilters.points === "Medium" && challenge.points > 100 && challenge.points <= 350) ||
        (activeFilters.points === "Hard" && challenge.points > 350);
  
      return matchesCategory && matchesPoints;
    });
  };
   

  const filteredChallenges = applyFilters(
    selectedCategory === "All"
      ? challenges
      : challenges.filter((challenge) => challenge.category === selectedCategory)
  );
  
  const handleBack = () => {
    setSelectedMaterial(null);
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setScore(null);
  };
  

        return (
          <div className="min-h-screen pt-24 flex">
            {/* Background with subtle patterns and gradients */}
            <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 -z-10">
              {/* Grid background */}
              <div className="absolute inset-0 bg-grid bg-[length:30px_30px] opacity-[0.03] dark:opacity-[0.02]"></div>
              
              {/* Background gradient circles for visual interest */}
              <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
              <div className="absolute top-1/3 right-0 w-72 h-72 bg-indigo-100/30 dark:bg-purple-900/10 rounded-full blur-3xl"></div>
            </div>
            <aside className="w-64 p-6 bg-white dark:bg-gray-900 shadow-xl rounded-r-3xl">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li
                    key={category}
                    className={`px-4 py-2 rounded-xl cursor-pointer transition-all duration-200 font-medium text-sm shadow-sm
                      ${selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            {/* Difficulty Filter */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 pt-4">Difficulty</h3>
              <div className="space-y-2">
              {["All", "Easy", "Medium", "Hard"].map((points) => (
                <button
                  key={points}
                  className={`w-full py-2.5 px-4 rounded-xl text-left font-medium transition-all duration-300 flex items-center ${
                    activeFilters.points === points
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => setActiveFilters((prev) => ({ ...prev, points }))}
                >
                  {points}
                </button>
              ))}
              </div>
            </div>
            </aside>
      
            <main className="flex-1 p-10">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white text-center mb-10">CTF Challenges</h2>
      
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges.map((challenge) => {
              const colorData = pointColors(challenge.points);
              const isSolved = solvedChallenges.includes(challenge.id);
              const solvedStyle = isSolved
                ? {
                    bg: "bg-gray-200 dark:bg-gray-900/50",
                    text: "text-black-800 dark:text-white-300 line-through",
                    border: "border-gray-300 dark:border-gray-700",
                  }
                : colorData;
              

              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  onClick={() => {
                    setSelectedChallenge(challenge);
                    setFlag("");
                    setMessage(null);
                  }}
                  className={`rounded-2xl p-6 shadow-lg cursor-pointer transition-transform duration-300 border hover:shadow-xl
                  ${solvedStyle.bg} ${solvedStyle.border}`}
                >

                  <h3 className={`text-xl font-semibold mb-2 ${solvedStyle.text}`}>
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{challenge.category}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300 pt-2">{challenge.points}</p>
                </motion.div>
              );
            })}

              </div>
            </main>
      
            {selectedChallenge && (
                  <motion.div
                  className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleBack}
                >
                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-11/12 max-w-3xl">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {selectedChallenge.title}
                  </h3>
                  <div className="prose dark:prose-invert mb-4 max-w-3xl">
                    <ReactMarkdown>{selectedChallenge.description}</ReactMarkdown>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Enter flag..."
                      value={flag}
                      onChange={(e) => setFlag(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md"
                    >
                      Submit
                    </button>
                  </form>
                  {message && <p className="text-center mt-4 text-green-500 dark:text-green-400">{message}</p>}
                  <button
                    onClick={() => setSelectedChallenge(null)}
                    className="mt-6 w-full text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        );
};

export default ChallengePage;
