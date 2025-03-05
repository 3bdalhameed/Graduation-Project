import React, { useState, useEffect } from "react";
import { FaFlag, FaUsers, FaBook, FaSchool } from "react-icons/fa";
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

  const handleAuthRedirect = async (path) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate(path);
    } else {
      navigate("/login");
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
        <a href="/" className="flex items-center">
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
            <FaFlag className="mr-2" />
            <a href="/login" className="hover:text-blue-400">
              CTF Portal
            </a>
          </li>
          <li className="flex items-center">
            <FaBook className="mr-2" />
            <a
              onClick={() => handleAuthRedirect("/login")}
              className="hover:text-blue-400 cursor-pointer"
            >
              Learning Portal
            </a>
          </li>
          <li className="flex items-center">
            <FaSchool className="mr-2" />
            <a
              onClick={() => handleAuthRedirect("/login")}
              className="hover:text-blue-400 cursor-pointer"
            >
              School Portal
            </a>
          </li>
          <li className="flex items-center">
            <FaUsers className="mr-2" />
            <a
              onClick={() => handleAuthRedirect("/login")}
              className="hover:text-blue-400 cursor-pointer"
            >
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
