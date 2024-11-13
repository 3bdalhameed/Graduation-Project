// src/components/NavBar.js
import React, { useState } from 'react';
import { FaCog, FaBell, FaFlag, FaUser, FaUsers, FaTachometerAlt, FaChartBar, FaGavel } from 'react-icons/fa';
import './navbar.css';
import logo from "../../pages/img/logo.png"

const NavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <a href="#">
        <img src={logo} alt="logo" />
      </a>
      <div className="burger-menu" onClick={toggleMenu}>
        ☰
      </div>

      <ul className={`nav-items ${isMenuOpen ? 'show' : ''}`}>
        <li className="nav-item">
          <FaTachometerAlt className="nav-icon" />
          <span>Dashboard</span>
        </li>
        <li className="nav-item">
          <FaGavel className="nav-icon" />
          <span>Rules</span>
        </li>
        <li className="nav-item">
          <FaChartBar className="nav-icon" />
          <span>Scoreboard</span>
        </li>
        <li className="nav-item">
          <FaFlag className="nav-icon" />
          <span>Challenges</span>
        </li>
        <li className="nav-item">
          <FaBell className="nav-icon" />
          <span>Notifications</span>
        </li>
        <li className="nav-item dropdown">
          <FaUser className="nav-icon" />
          <span>Users</span>
        </li>
        <li className="nav-item dropdown">
          <FaUsers className="nav-icon" />
          <span>Teams</span>
        </li>
        <li className="nav-item">
          <FaCog className="nav-icon" />
          <span>Settings</span>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
