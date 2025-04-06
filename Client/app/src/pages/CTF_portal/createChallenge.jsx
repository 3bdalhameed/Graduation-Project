import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar_logon/navbar";

const ChallengePage = () => {
  const [challenges, setChallenges] = useState([]);
  const [solvedChallenges, setSolvedChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [flag, setFlag] = useState("");
  const [message, setMessage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isEditing, setIsEditing] = useState(false);
  const [editedChallenge, setEditedChallenge] = useState({ title: "", description: "", category: "", points: "", flag: "" });
  const [isCreating, setIsCreating] = useState(false);
  const [newChallenge, setNewChallenge] = useState({ title: "", description: "", category: "Web Exploitation", points: "50", flag: "" });
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/challenge/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setChallenges(data);
        const uniqueCategories = ["All", ...new Set(data.map(challenge => challenge.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching challenges:", error));
  }, [token]);

  const handleCreateChallenge = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/challenge/create/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newChallenge),
      });
      const data = await response.json();
      if (response.ok) {
        setChallenges([...challenges, data]);
        setIsCreating(false);
      }
    } catch (error) {
      console.error("Error creating challenge:", error);
    }
  };

  const handleEditChallenge = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/challenge/${selectedChallenge.id}/edit/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedChallenge),
      });
      const updatedChallenge = await response.json();
      setChallenges(challenges.map(ch => (ch.id === updatedChallenge.id ? updatedChallenge : ch)));
      setSelectedChallenge(updatedChallenge);
      setIsEditing(false);
    } catch (error) {
      console.error("Error editing challenge:", error);
    }
  };

  const handleDeleteChallenge = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/api/challenge/${selectedChallenge.id}/delete/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setChallenges(challenges.filter(ch => ch.id !== selectedChallenge.id));
      setSelectedChallenge(null);
    } catch (error) {
      console.error("Error deleting challenge:", error);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 pt-24 px-4">
        <div className="flex flex-col items-center">
          <button
            onClick={() => setIsCreating(true)}
            className="mb-8 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl text-lg font-semibold transition"
          >
             Create New Challenge
          </button>
  
          <div className="w-full max-w-6xl">
            <h2 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-8">
              🧩 Challenges
            </h2>
  
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className={`p-6 rounded-2xl shadow-lg transition cursor-pointer hover:scale-[1.02] duration-300
                    ${solvedChallenges.includes(challenge.id)
                      ? "bg-green-100 dark:bg-green-700"
                      : "bg-white dark:bg-gray-800"
                    }`}
                    onClick={() => {
                      setSelectedChallenge(challenge);
                      setFlag("");
                      setMessage(null);
                      setIsEditing(false);
                      setEditedChallenge({
                        title: challenge.title,
                        description: challenge.description,
                        category: challenge.category,
                        points: challenge.points,
                        flag: challenge.flag,
                      });
                    }}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{challenge.title}</h3>
                  <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">{challenge.category}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  
      {/* Modal - Create */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl w-[95%] max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
              ✍️ Create Challenge
            </h2>
            <form onSubmit={handleEditChallenge} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={editedChallenge.title}
              onChange={(e) => setEditedChallenge({ ...editedChallenge, title: e.target.value })}
              className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white border"
            />

            <textarea
              placeholder="Description"
              value={editedChallenge.description}
              onChange={(e) => setEditedChallenge({ ...editedChallenge, description: e.target.value })}
              className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white border"
              rows="3"
            />

            <select
              value={editedChallenge.category}
              onChange={(e) => setEditedChallenge({ ...editedChallenge, category: e.target.value })}
              className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white border"
            >
              <option>Web Exploitation</option>
              <option>Reverse Engineering</option>
              <option>Cryptography</option>
              <option>Digital Forensics</option>
              <option>OSINT</option>
              <option>Miscellaneous</option>
            </select>

            <input
              type="number"
              placeholder="Points"
              value={editedChallenge.points}
              onChange={(e) => setEditedChallenge({ ...editedChallenge, points: e.target.value })}
              className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white border"
            />

            <input
              type="text"
              placeholder="Flag"
              value={editedChallenge.flag}
              onChange={(e) => setEditedChallenge({ ...editedChallenge, flag: e.target.value })}
              className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white border"
            />

            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold">
              💾 Save Changes
            </button>
            <div className="flex justify-between mt-4 gap-2">
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setNewChallenge({
                  title: "",
                  description: "",
                  category: "Web Exploitation",
                  points: "50",
                  flag: "",
                });
              }}
              className="w-full mt-2 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-xl"
            >
              ✖ Close
            </button>
            </div>
          </form>

          </div>
        </div>
      )}
  
      {/* Modal - Edit */}
      {selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl w-[95%] max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
              ✏️ Edit Challenge
            </h2>
            <form onSubmit={handleEditChallenge} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={editedChallenge.title}
                onChange={(e) => setEditedChallenge({ ...editedChallenge, title: e.target.value })}
                className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white border"
              />

              <textarea
                placeholder="Description"
                value={editedChallenge.description}
                onChange={(e) => setEditedChallenge({ ...editedChallenge, description: e.target.value })}
                className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white border"
                rows="3"
              />

              <select
                value={editedChallenge.category}
                onChange={(e) => setEditedChallenge({ ...editedChallenge, category: e.target.value })}
                className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white border"
              >
                <option>Web Exploitation</option>
                <option>Reverse Engineering</option>
                <option>Cryptography</option>
                <option>Digital Forensics</option>
                <option>OSINT</option>
                <option>Miscellaneous</option>
              </select>

              <input
                type="number"
                placeholder="Points"
                value={editedChallenge.points}
                onChange={(e) => setEditedChallenge({ ...editedChallenge, points: e.target.value })}
                className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white border"
              />

              <input
                type="text"
                placeholder="Flag"
                value={editedChallenge.flag}
                onChange={(e) => setEditedChallenge({ ...editedChallenge, flag: e.target.value })}
                className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white border"
              />

              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold">
                💾 Save Changes
              </button>
            </form>
            <div className="flex justify-between mt-4 gap-2">
              <button onClick={handleDeleteChallenge}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl">
                🗑 Delete
              </button>
              <button onClick={() => setSelectedChallenge(null)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-xl">
                ✖ Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );  
};

export default ChallengePage;
