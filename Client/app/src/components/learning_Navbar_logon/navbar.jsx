import React, { useState, useEffect } from "react";
import {
  FaCog,
  FaFlag,
  FaDoorOpen,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../pages/img/JuCC_logo.png";
import { isAuthenticated } from "./auth";
import useTokenStore from "../../stores/useTokenStore";
import { logout } from "../../api/users";

const NavBar = () => {
  const [auth, setAuth] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const token = useTokenStore((state) => state.token);
  const clearToken = useTokenStore((state) => state.clearToken);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isAuthenticated();
      setAuth(result.isAuthenticated);
    };
    checkAuth();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    try {
      // Use API function instead of direct fetch call
      await logout(token);
      localStorage.removeItem("access_token");
      clearToken();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
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
        <Link to="/home" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </Link>

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
            menuOpen ? "flex" : "hidden"
          } md:static absolute top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent md:py-0 py-6 md:shadow-none shadow-lg z-50`}
        >
          <li className="flex items-center">
            <FaFlag className="mr-2" />
            <Link to="/learningPortalAssessments" className="hover:text-blue-400">
              Assessments
            </Link>
          </li>
          <li className="flex items-center">
            <FaFlag className="mr-2" />
            <Link to="/learningPortalMaterials" className="hover:text-blue-400">
              Learning
            </Link>
          </li>
          <li className="flex items-center">
            <FaCog className="mr-2" />
            <Link to="/settings" className="hover:text-blue-400">
              Settings
            </Link>
          </li>
          <li className="flex items-center">
            <button 
              onClick={handleLogout} 
              className="hover:text-blue-400 rounded"
            >
              <FaDoorOpen className="mr-2" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
