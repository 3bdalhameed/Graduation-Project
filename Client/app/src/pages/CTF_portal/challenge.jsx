import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTokenStore from "../../stores/useTokenStore";

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

  // Fetch all challenges
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/challenge/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setChallenges(data);
        const uniqueCategories = [
          "All",
          ...new Set(data.map((challenge) => challenge.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching challenges:", error));

    // Fetch solved challenges
    fetch("http://127.0.0.1:8000/api/solved-challenges/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) =>
        setSolvedChallenges(data.map((challenge) => challenge.id))
      )
      .catch((error) =>
        console.error("Error fetching solved challenges:", error)
      );
  }, [token]);

  // Handle flag submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!selectedChallenge) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/challenge/${selectedChallenge.id}/submit/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ flag }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setSolvedChallenges([...solvedChallenges, selectedChallenge.id]);
      } else {
        setMessage("Incorrect flag or submission failed.");
      }
    } catch (err) {
      setMessage("An error occurred while submitting the flag.");
    }
  };

  // Filter challenges based on selection
  const filteredChallenges =
    selectedCategory === "All"
      ? challenges
      : challenges.filter(
          (challenge) => challenge.category === selectedCategory
        );

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 flex">
        {/* Sidebar for category filter */}
        <div className="w-64 p-4 bg-white dark:bg-gray-800 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Filters
          </h3>
          <ul>
            {categories.map((category) => (
              <li
                key={category}
                className={`cursor-pointer p-2 rounded-lg ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "text-gray-800 dark:text-white"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Challenges
          </h2>

          {/* Challenges List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className={`p-6 ${
                  solvedChallenges.includes(challenge.id)
                    ? "bg-green-200 dark:bg-green-700"
                    : "bg-white dark:bg-gray-700"
                } rounded-lg shadow-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300`}
                onClick={() => {
                  setSelectedChallenge(challenge);
                  setFlag("");
                  setMessage(null);
                }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {challenge.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                  {challenge.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Challenge Details */}
      {selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-5/12 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedChallenge.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              {selectedChallenge.description}
            </p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <input
                type="text"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                placeholder="Enter the flag"
                className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white border border-gray-300"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-lg text-lg font-semibold transition duration-300"
              >
                Submit Flag
              </button>
            </form>
            {message && <p className="text-green-500 mt-2">{message}</p>}
            <button
              onClick={() => setSelectedChallenge(null)}
              className="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChallengePage;
