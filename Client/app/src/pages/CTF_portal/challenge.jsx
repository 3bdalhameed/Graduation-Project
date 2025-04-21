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
  const navigate = useNavigate();

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

  const filteredChallenges =
    selectedCategory === "All"
      ? challenges
      : challenges.filter((challenge) => challenge.category === selectedCategory);

        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 pt-24 flex">
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
            </aside>
      
            <main className="flex-1 p-10">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white text-center mb-10">CTF Challenges</h2>
      
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChallenges.map((challenge) => (
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
                      ${solvedChallenges.includes(challenge.id)
                        ? "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800"
                        : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"}`}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{challenge.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">{challenge.category}</p>
                  </motion.div>
                ))}
              </div>
            </main>
      
            {selectedChallenge && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-11/12 max-w-lg">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {selectedChallenge.title}
                  </h3>
                  <div className="prose dark:prose-invert mb-4">
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
              </div>
            )}
          </div>
        );
};

export default ChallengePage;
