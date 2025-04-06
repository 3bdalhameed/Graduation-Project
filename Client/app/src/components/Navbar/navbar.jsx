import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFlag, FaBook, FaSchool } from "react-icons/fa";
import Logo from "./components/Logo";
import BurgerMenu from "./components/BurgerMenu";
import DarkModeToggle from "./components/DarkModeToggle";

const NavBar = () => {
  // State management
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolledDown, setScrolledDown] = useState(false);
  const navigate = useNavigate();

  // Navigation items configuration
  const navItems = [
    {
      label: "Learning Portal",
      icon: <FaBook className="mr-2" />,
      href: "/learningPortalLogin",
      color: "text-green-600 dark:text-green-400",
      hover: "hover:bg-green-50 dark:hover:bg-green-900/20"
    },
    {
      label: "School Portal",
      icon: <FaSchool className="mr-2" />,
      href: "/schoollogin",
      color: "text-yellow-600 dark:text-yellow-400",
      hover: "hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
    },
    {
      label: "CTF Portal",
      icon: <FaFlag className="mr-2" />,
      href: "/login",
      color: "text-blue-600 dark:text-blue-400",
      hover: "hover:bg-blue-50 dark:hover:bg-blue-900/20"
    }
  ];

  // Handle navigation with auth check
  const handleNavigation = (path) => {
    const token = localStorage.getItem("access_token");
    navigate(token ? path : "/login");
  };

  // Handle scroll behavior
  const handleScroll = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 80) {
      setIsVisible(false); // Hide on scroll down
    } else {
      setIsVisible(true); // Show on scroll up
    }
    
    setScrolledDown(window.scrollY > 20);
    setLastScrollY(window.scrollY);
  };

  // Handle menu toggle
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  // Setup scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  
  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Render navigation item
  const renderNavItem = (item, index, isMobile = false) => (
    <div
      key={index}
      onClick={() => {
        handleNavigation(item.href);
        if (isMobile) setMenuOpen(false);
      }}
      className={`
        flex items-center rounded-lg font-medium transition-colors duration-200 cursor-pointer
        ${item.color} ${item.hover}
        ${isMobile ? 'px-4 py-3' : 'px-4 py-2 text-sm'}
      `}
    >
      {item.icon}
      {item.label}
    </div>
  );

  // If navbar is hidden, don't render
  if (!isVisible) return null;

  return (
    <nav
      className={`
        fixed w-full z-50 transition-all duration-300
        ${scrolledDown ? "bg-white/90 dark:bg-gray-900/90 shadow-md" : "bg-white/70 dark:bg-gray-900/70"}
        backdrop-blur-md
      `}
    >
      {/* Main navbar container */}
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => renderNavItem(item, index))}
        </div>

        {/* Right section: Auth buttons & dark mode toggle */}
        <div className="flex items-center space-x-4">
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex space-x-2">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 rounded-lg transition-colors"
            >
              Sign Up
            </button>
          </div>

          <DarkModeToggle />

          {/* Mobile menu button */}
          <div className="md:hidden">
            <BurgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 space-y-3">
            {navItems.map((item, index) => renderNavItem(item, index, true))}
            
            {/* Mobile Auth Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  navigate('/login');
                  setMenuOpen(false);
                }}
                className="w-full py-2 text-center text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate('/signup');
                  setMenuOpen(false);
                }}
                className="w-full py-2 text-center text-sm font-medium text-white bg-blue-600 dark:bg-blue-700 rounded-lg"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
