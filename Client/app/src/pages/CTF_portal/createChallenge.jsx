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
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 flex flex-col items-center">
        <button 
          onClick={() => setIsCreating(true)} 
          className="mb-6 bg-blue-500 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition duration-300"
        >
          Create New Challenge
        </button>
        <div className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Challenges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <div key={challenge.id} className={`p-6 ${solvedChallenges.includes(challenge.id) ? "bg-green-200 dark:bg-green-700" : "bg-white dark:bg-gray-700"} rounded-lg shadow-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300`} 
                   onClick={() => { setSelectedChallenge(challenge); setFlag(''); setMessage(null); setIsEditing(false); }}>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{challenge.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{challenge.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New Challenge</h2>
            <form onSubmit={handleCreateChallenge} className="mt-4">
              <input type="text" placeholder="Title" value={newChallenge.title} onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })} className="w-full p-2 rounded mb-2" />
              <textarea placeholder="Description" value={newChallenge.description} onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })} className="w-full p-2 rounded mb-2" />
              <select value={newChallenge.category} onChange={(e) => setNewChallenge({ ...newChallenge, category: e.target.value })} className="w-full p-2 rounded mb-2">
                <option value="Web Exploitation">Web Exploitation</option>
                <option value="Reverse Engineering">Reverse Engineering</option>
                <option value="Cryptography">Cryptography</option>
                <option value="Digital Forensics">Digital Forensics</option>
                <option value="OSINT">OSINT</option>
                <option value="Miscellaneous">Misc</option>
              </select>
              <input type="number" placeholder="Points" value={newChallenge.points} onChange={(e) => setNewChallenge({ ...newChallenge, points: e.target.value })} className="w-full p-2 rounded mb-2" />
              <input type="text" placeholder="Flag" value={newChallenge.flag} onChange={(e) => setNewChallenge({ ...newChallenge, flag: e.target.value })} className="w-full p-2 rounded mb-2" />
              <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white py-2 rounded">Create</button>
            </form>
            <button onClick={() => setIsCreating(false)} className="mt-2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg">Close</button>
          </div>
        </div>
      )}

      {selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Challenge</h2>
            <form onSubmit={handleEditChallenge} className="mt-4">
              <input type="text" value={editedChallenge.title} onChange={(e) => setEditedChallenge({ ...editedChallenge, title: e.target.value })} className="w-full p-2 rounded mb-2" />
              <textarea value={editedChallenge.description} onChange={(e) => setEditedChallenge({ ...editedChallenge, description: e.target.value })} className="w-full p-2 rounded mb-2" />
              <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white py-2 rounded">Save Changes</button>
            </form>
            <button onClick={handleDeleteChallenge} className="mt-2 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg">Delete</button>
            <button onClick={() => setSelectedChallenge(null)} className="mt-2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg">Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChallengePage;
