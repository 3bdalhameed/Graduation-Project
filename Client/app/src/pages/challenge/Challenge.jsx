import React, { useState } from "react";
import NavBar from "../../components/Navbar/navbar";

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const challenges = [
    {
      id: 1,
      title: "Crypto Challenge",
      difficulty: "Medium",
      category: "Cryptography",
      author: "Alice",
      description: "Decrypt the given ciphertext to retrieve the flag.",
    },
    {
      id: 2,
      title: "Forensics Task",
      difficulty: "Easy",
      category: "Forensics",
      author: "Bob",
      description:
        "Analyze the provided image file to find hidden information.",
    },
    {
      id: 3,
      title: "Web Exploit",
      difficulty: "Hard",
      category: "Web",
      author: "Eve",
      description: "Find and exploit the vulnerabilities in the given website.",
    },
  ];

  const toggleModal = (challenge = null) => {
    setSelectedChallenge(challenge);
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      <header className="bg-gray-900 text-white shadow-md">
        <NavBar />
      </header>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-gray-800 text-white p-6">
          <h2 className="text-2xl font-bold mb-4">Filters</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Difficulty</h3>
              <div className="space-y-2">
                <button className="w-full py-2 px-4 bg-gray-700 rounded hover:bg-gray-600">
                  All
                </button>
                <button className="w-full py-2 px-4 bg-green-500 rounded hover:bg-green-400">
                  Easy
                </button>
                <button className="w-full py-2 px-4 bg-yellow-500 rounded hover:bg-yellow-400">
                  Medium
                </button>
                <button className="w-full py-2 px-4 bg-red-500 rounded hover:bg-red-400">
                  Hard
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Categories</h3>
              <div className="space-y-2">
                <button className="w-full py-2 px-4 bg-blue-500 rounded hover:bg-blue-400">
                  Cryptography
                </button>
                <button className="w-full py-2 px-4 bg-purple-500 rounded hover:bg-purple-400">
                  Forensics
                </button>
                <button className="w-full py-2 px-4 bg-teal-500 rounded hover:bg-teal-400">
                  Web
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-3xl font-bold mb-6">Challenges</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                onClick={() => toggleModal(challenge)}
              >
                <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
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
                <p className="text-gray-600 text-sm">Author: {challenge.author}</p>
              </div>
            ))}
          </div>

          {/* Modal */}
          {isModalOpen && selectedChallenge && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
                  onClick={() => toggleModal()}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">
                  {selectedChallenge.title}
                </h2>
                <div className="flex items-center space-x-2 mb-4">
                  <span
                    className={`text-xs font-semibold py-1 px-2 rounded ${
                      selectedChallenge.difficulty === "Easy"
                        ? "bg-green-500 text-white"
                        : selectedChallenge.difficulty === "Medium"
                        ? "bg-yellow-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {selectedChallenge.difficulty}
                  </span>
                  <span className="bg-blue-500 text-white text-xs font-semibold py-1 px-2 rounded">
                    {selectedChallenge.category}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{selectedChallenge.description}</p>
                <input
                  type="text"
                  placeholder="Enter your flag"
                  className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-400">
                  Submit Flag
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default App;
