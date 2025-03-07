import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar_logon/navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const App = () => {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    difficulty: "All",
    category: "All",
    subcategory: "All",
  });

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/api/validate-token/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    const fetchChallenges = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:8000/api/challenge/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setChallenges(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch challenges");
        setLoading(false);
      }
    };

    validateToken();
    fetchChallenges();
  }, [navigate]);

  const toggleModal = (challenge = null) => {
    setSelectedChallenge(challenge);
    setModalOpen(!isModalOpen);
  };

  const applyFilters = (challenges) => {
    return challenges.filter((challenge) => {
      const matchesDifficulty =
        activeFilters.difficulty === "All" || challenge.difficulty === activeFilters.difficulty;
      const matchesCategory =
        activeFilters.category === "All" || challenge.category === activeFilters.category;
      const matchesSubcategory =
        activeFilters.subcategory === "All" || challenge.subcategory === activeFilters.subcategory;
      return matchesDifficulty && matchesCategory && matchesSubcategory;
    });
  };

  const filteredChallenges = applyFilters(challenges);

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md">
        <NavBar />
      </div>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Filters</h2>
          <div className="space-y-4">
            {/* Difficulty Filter */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Difficulty</h3>
              <div className="space-y-2">
                {["All", "Easy", "Medium", "Hard"].map((difficulty) => (
                  <button
                    key={difficulty}
                    className={`w-full py-2 px-4 rounded ${
                      activeFilters.difficulty === difficulty
                        ? "bg-blue-500 dark:bg-blue-600"
                        : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                    onClick={() =>
                      setActiveFilters((prev) => ({
                        ...prev,
                        difficulty,
                      }))
                    }
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Categories</h3>
              <div className="space-y-2">
                {["All", "Cryptography", "Forensics", "Web"].map((category) => (
                  <button
                    key={category}
                    className={`w-full py-2 px-4 rounded ${
                      activeFilters.category === category
                        ? "bg-blue-500 dark:bg-blue-600"
                        : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                    onClick={() =>
                      setActiveFilters((prev) => ({
                        ...prev,
                        category,
                      }))
                    }
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Challenges</h1>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredChallenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                  onClick={() => toggleModal(challenge)}
                >
                  <h3 className="text-xl font-bold mb-2">{challenge.name}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span
                      className={`text-xs font-semibold py-1 px-2 rounded ${
                        challenge.difficulty === "Easy"
                          ? "bg-green-500 text-white"
                          : challenge.difficulty === "Medium"
                          ? "bg-yellow-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {challenge.difficulty}
                    </span>
                    <span className="bg-blue-500 text-white text-xs font-semibold py-1 px-2 rounded">
                      {challenge.category}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Author: {challenge.creator}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Modal */}
          {isModalOpen && selectedChallenge && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-2xl"
                  onClick={() => toggleModal()}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">{selectedChallenge.name}</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {selectedChallenge.description}
                </p>
                <input
                  type="text"
                  placeholder="Enter your flag"
                  className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                />
                <button className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-400">
                  Submit Flag
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
