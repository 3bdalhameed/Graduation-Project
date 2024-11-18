import React, { useState } from 'react';
import { FaCog, FaBell, FaFlag, FaUser, FaUsers, FaGavel, FaChartBar } from 'react-icons/fa';
import './navbar.css';
import logo from "../../pages/img/logo.png";
import { checkAuthentication } from './auth';
import { useNavigate } from 'react-router-dom';
import challenge from "../../pages/Challenge"

const NavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleAuthRedirect = async (path) => {
    const isAuthenticated = await checkAuthentication();
    if (isAuthenticated) {
        navigate(path);
    } else {
        navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <a href="/">
        <img src={logo} alt="logo" />
      </a>
      <div className="burger-menu" onClick={toggleMenu}>
        ☰
      </div>

      <ul className={`nav-items ${isMenuOpen ? 'show' : ''}`}>
        <li className="nav-item">
          <FaGavel className="nav-icon" />
          <a href="Rules">
          <span>Rules</span>
          </a>
        </li>
        <li className="nav-item">
          <FaChartBar className="nav-icon" />
          <a href="Scorevoard">
            <span>Scoreboard</span>
          </a>
        </li>
        <li className="nav-item">
          <FaFlag className="nav-icon" />
          <a href="challenge">
            <span>Challenges</span>
          </a>
        </li>
        <li className="nav-item">
          <FaBell className="nav-icon" />
          <a href="Notifications">
            <span>Notifications</span>
          </a>
        </li>
        <li className="nav-item dropdown">
          <FaUser className="nav-icon" />
          <span><a onClick={() => handleAuthRedirect("/users")}>Users</a></span>
        </li>
        <li className="nav-item dropdown">
          <FaUsers className="nav-icon" />
          <span><a onClick={() => handleAuthRedirect("/teams")}>Teams</a></span>
        </li>
        <li className="nav-item">
          <FaCog className="nav-icon" />
          <a href="Settings">
            <span>Settings</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
