import React, { useState } from "react";
import "./challenge.css"; // Add the CSS below for styling.
import NavBar from "../../components/Navbar/navbar";

const App = () => {
  // State for managing challenges
  const [challenges, setChallenges] = useState([
    { title: "Verify", difficulty: "Easy", category: "Forensics", author: "Jeffery John", description: "People keep trying to trick my players with imitation flags. I want to make sure they get the real thing! I'm going to provide the SHA-256 hash and a decrypt script to help you know that my flags are legitimate." },
  ]);

  // State for modal visibility
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  // State for new challenge input
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    difficulty: "",
    category: "",
    author: "",
    description: "",
  });

  // Toggle modal visibility and set selected challenge
  const toggleModal = (challenge) => {
    setSelectedChallenge(challenge);
    setModalOpen(!isModalOpen);
  };

  // Function to add a new challenge
  const addChallenge = () => {
    if (newChallenge.title && newChallenge.difficulty && newChallenge.category) {
      setChallenges([...challenges, newChallenge]);
      setNewChallenge({ title: "", difficulty: "", category: "", author: "", description: "" });
    } else {
      alert("Please fill out all required fields!");
    }
  };

  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className="app">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="filters">
            <label>
              <input type="checkbox" />
              Hide Solved
            </label>
            <label>
              <input type="checkbox" />
              Show Bookmarked
            </label>
            <label>
              <input type="checkbox" />
              Show Assigned
            </label>
            <input type="text" placeholder="Search by Name" className="search-bar" />
          </div>
          <div className="difficulty-filter">
            <h4>Difficulty</h4>
            <button>All</button>
            <button>Easy</button>
            <button>Medium</button>
            <button>Hard</button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Existing Challenges */}
          {challenges.map((challenge, index) => (
            <div className="Ccard" key={index} onClick={() => toggleModal(challenge)}>
              <h3>{challenge.title}</h3>
              <p>Difficulty: {challenge.difficulty}</p>
              <p>Category: {challenge.category}</p>
            </div>
          ))}

          {/* Modal */}
          {isModalOpen && selectedChallenge && (
            <div className="modal-overlay">
              <div className="modal">
                <button className="close-button" onClick={() => setModalOpen(false)}>
                  &times;
                </button>
                <div className="modal-header">
                  <h2>{selectedChallenge.title}</h2>
                  <div className="badges">
                    <span className={`badge ${selectedChallenge.difficulty.toLowerCase()}`}>
                      {selectedChallenge.difficulty}
                    </span>
                    <span className={`badge ${selectedChallenge.category.toLowerCase()}`}>
                      {selectedChallenge.category}
                    </span>
                  </div>
                </div>
                <p className="author">AUTHOR: {selectedChallenge.author || "Unknown"}</p>
                <p className="description">{selectedChallenge.description}</p>
                <button className="launch-button">Launch Instance</button>
                <div className="submit-section">
                  <input type="text" placeholder="JUccCTF(FLAG)" className="flag-input" />
                  <button className="submit-button">Submit Flag</button>
                </div>
              </div>
            </div>
          )}

          {/* Add New Challenge Form */}
          <div className="add-challenge-form">
            <h3>Add a New Challenge</h3>
            <input
              type="text"
              placeholder="Title"
              value={newChallenge.title}
              onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Difficulty (Easy, Medium, Hard)"
              value={newChallenge.difficulty}
              onChange={(e) => setNewChallenge({ ...newChallenge, difficulty: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              value={newChallenge.category}
              onChange={(e) => setNewChallenge({ ...newChallenge, category: e.target.value })}
            />
            <input
              type="text"
              placeholder="Author"
              value={newChallenge.author}
              onChange={(e) => setNewChallenge({ ...newChallenge, author: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={newChallenge.description}
              onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
            />
            <button className="add-button" onClick={addChallenge}>
              Add Challenge
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
