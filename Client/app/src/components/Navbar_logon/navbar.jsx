import React, { useState, useEffect, useContext } from "react";
import {
  FaCog,
  FaBell,
  FaFlag,
  FaUser,
  FaUsers,
  FaGavel,
  FaChartBar,
  FaDoorOpen,
} from "react-icons/fa";
import { checkAuthentication } from "./auth";
import { useNavigate } from "react-router-dom";
import logo from "../../pages/img/JuCC_logo.png";

const NavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };



  const logout = async () => {
    // Remove the access token from localStorage
    localStorage.removeItem("access_token");
  
    // Optionally remove the refresh token if stored
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      localStorage.removeItem("refresh_token");
    }
  
    setIsLoggedin(false);
  
    try {
      const response = await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }), // Send refresh token for blacklisting
      });
  
      if (response.ok) {
        console.log("Logout successful");
      } else {
        console.error("Failed to logout:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  
    // Redirect to login or home page
    navigate("/login");
  };
  


  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsVisible(false); // Hide navbar when scrolling down
    } else {
      setIsVisible(true); // Show navbar when scrolling up
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`bg-gray-900 text-white shadow-md fixed w-full z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="/home" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </a>

        {/* Burger Menu for Mobile */}
        <div
          className="text-xl md:hidden cursor-pointer"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </div>

        {/* Navigation Links */}
        <ul
          className={`flex-col md:flex-row md:flex items-center space-y-4 md:space-y-0 md:space-x-8 ${
            isMenuOpen ? "flex" : "hidden"
          } md:static absolute top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent md:py-0 py-6 md:shadow-none shadow-lg z-50`}
        >
          <li className="flex items-center">
            <FaGavel className="mr-2" />
            <a href="/rules" className="hover:text-blue-400">
              Rules
            </a>
          </li>
          <li className="flex items-center">
            <FaChartBar className="mr-2" />
            <a href="/scoreboard" className="hover:text-blue-400">
              Scoreboard
            </a>
          </li>
          <li className="flex items-center">
            <FaFlag className="mr-2" />
            <a href="/challenge" className="hover:text-blue-400">
              Challenges
            </a>
          </li>
          <li className="flex items-center">
            <FaBell className="mr-2" />
            <a href="/notifications" className="hover:text-blue-400">
              Notifications
            </a>
          </li>
          <li className="flex items-center">
            <FaUser className="mr-2" />
            <a
              href="/users"
              className="hover:text-blue-400 cursor-pointer"
            >
              Users
            </a>
          </li>
          <li className="flex items-center">
            <FaUsers className="mr-2" />
            <a
              href="/teams"
              className="hover:text-blue-400 cursor-pointer"
            >
              Teams
            </a>
          </li>
          <li className="flex items-center">
            <FaCog className="mr-2" />
            <a href="/settings" className="hover:text-blue-400">
              Settings
            </a>
          </li>
          <li className="flex items-center">
            <a 
            href="/" 
            className="hover:text-blue-400 rounded"
            onClick={logout}
            >
            <FaDoorOpen className="mr-2" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
