import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar_logon/navbar";

const ChallengePage = () => {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [flag, setFlag] = useState("");
  const [message, setMessage] = useState(null);
  const token = localStorage.getItem("access_token");

  // Fetch all challenges using Fetch API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/challenge/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setChallenges(data))
      .catch((error) => console.error("Error fetching challenges:", error));
  }, [token]);

  // Handle flag submission using Fetch API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    
    if (!selectedChallenge) return;
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/challenge/${selectedChallenge.id}/submit/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ flag }),
      });
      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage("Incorrect flag or submission failed.");
      }
    } catch (err) {
      setMessage("An error occurred while submitting the flag.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 flex justify-center">
        <div className="max-w-5xl w-full bg-white dark:bg-gray-800 shadow-lg p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Challenges</h2>
          
          {/* Challenges List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer" 
                   onClick={() => setSelectedChallenge(challenge)}>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{challenge.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Challenge Details */}
      {selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedChallenge.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mt-2">{selectedChallenge.description}</p>
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
            <button onClick={() => setSelectedChallenge(null)} className="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChallengePage;