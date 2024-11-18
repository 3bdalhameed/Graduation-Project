import React, { useState } from "react";
import "./test.css"; // Add the CSS below for styling.
import "../components/Navbar/navbar"
import NavBar from "../components/Navbar/navbar";

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
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
        {/* Card Component */}
        <div className="card" onClick={toggleModal}>
          <h3>Verify</h3>
          <p>Difficulty: Easy</p>
          <p>Category: Forensics</p>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <button className="close-button" onClick={toggleModal}>
                &times;
              </button>
              <div className="modal-header">
                <h2>Verify</h2>
                <div className="badges">
                  <span className="badge easy">Easy</span>
                  <span className="badge forensics">Forensics</span>
                  <span className="badge pico">JUCC 2024</span>
                </div>
              </div>
              <p className="author">AUTHOR: Jeffery John</p>
              <p className="description">
                People keep trying to trick my players with imitation flags. I want to make sure they
                get the real thing! I'm going to provide the SHA-256 hash and a decrypt script to
                help you know that my flags are legitimate.
              </p>
              <button className="launch-button">Launch Instance</button>
              <div className="submit-section">
                <input type="text" placeholder="picoCTF(FLAG)" className="flag-input" />
                <button className="submit-button">Submit Flag</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
    </>
  );
};

export default App;