import React from 'react';

function Filters() {
  return (
    <div className="filters">
      <div className="filter-section">
        <label><input type="checkbox" id="hide-solved" /> Hide Solved</label>
        <label><input type="checkbox" id="show-bookmarked" /> Show Bookmarked</label>
        <label><input type="checkbox" id="show-assigned" /> Show Assigned</label>
        <input type="text" id="search" placeholder="Search by Name" />
      </div>
      <div className="filter-section">
        <h3>Difficulty</h3>
        <button className="filter-button">All Difficulties</button>
        <button className="filter-button">Easy</button>
        <button className="filter-button">Medium</button>
        <button className="filter-button">Hard</button>
      </div>
      <div className="filter-section">
        <h3>Category</h3>
        <button className="filter-button">All Categories</button>
        <button className="filter-button">Web Exploitation</button>
        <button className="filter-button">Cryptography</button>
        <button className="filter-button">Reverse Engineering</button>
        <button className="filter-button">Forensics</button>
        <button className="filter-button">General Skills</button>
        <button className="filter-button">Binary Exploitation</button>
      </div>
      <div className="filter-section">
        <h3>Original Event</h3>
        <button className="filter-button">All Events</button>
        <button className="filter-button">picoCTF 2024</button>
        <button className="filter-button">picoCTF 2023</button>
        {/* Add more buttons as needed */}
      </div>
    </div>
  );
}

export default Filters;
