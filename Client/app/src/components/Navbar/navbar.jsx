import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaFlag,
  FaBook,
  FaSchool,
  FaCaretDown,
  FaUserGraduate,
  FaChartBar,
  FaLaptopCode,
  FaUsers,
  FaLock,
  FaSignInAlt,
  FaUserPlus,
  FaDoorOpen,
  FaBell
} from "react-icons/fa";
import Logo from "./components/Logo";
import BurgerMenu from "./components/BurgerMenu";
import DarkModeToggle from "./components/DarkModeToggle";
import useTokenStore from "../../stores/useTokenStore";
import { logout } from "../../api/users";

const NavBar = () => {
  // State management
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  // Get token from store instead of localStorage
  const token = useTokenStore((state) => state.token);
  const clearToken = useTokenStore((state) => state.clearToken);
  const isLoggedIn = !!token;

  // Navigation items configuration with dropdown menus
  const navItems = [
    {
      label: "Learning Portal",
      icon: <FaBook className="mr-2" />,
      color: "text-green-600 dark:text-green-400",
      hover: "hover:bg-green-50 dark:hover:bg-green-900/20",
      dropdown: true,
      dropdownItems: [
        {
          label: "Home",
          icon: <FaBook className="mr-2" />,
          href: "/learningPortalHome",
          requiresAuth: true,
        },
        {
          label: "Materials",
          icon: <FaLaptopCode className="mr-2" />,
          href: "/learningPortalMaterials",
          requiresAuth: true,
        },
        {
          label: "Assessments",
          icon: <FaUserGraduate className="mr-2" />,
          href: "/learningPortalAssessments",
          requiresAuth: true,
        },
        {
          label: "Login",
          icon: <FaSignInAlt className="mr-2" />,
          href: "/learningPortalLogin",
          requiresAuth: false,
        },
        {
          label: "Sign Up",
          icon: <FaUserPlus className="mr-2" />,
          href: "/learningPortalSignup",
          requiresAuth: false,
        },
      ],
    },
    {
      label: "School Portal",
      icon: <FaSchool className="mr-2" />,
      color: "text-yellow-600 dark:text-yellow-400",
      hover: "hover:bg-yellow-50 dark:hover:bg-yellow-900/20",
      dropdown: true,
      dropdownItems: [
        {
          label: "Dashboard",
          icon: <FaUsers className="mr-2" />,
          href: "/schoolmain",
          requiresAuth: true,
        },
        {
          label: "Admin Panel",
          icon: <FaLock className="mr-2" />,
          href: "/school/createuser",
          requiresAuth: true,
        },
        {
          label: "Login",
          icon: <FaSignInAlt className="mr-2" />,
          href: "/schoollogin",
          requiresAuth: false,
        },
      ],
    },
    {
      label: "CTF Portal",
      icon: <FaFlag className="mr-2" />,
      color: "text-blue-600 dark:text-blue-400",
      hover: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
      dropdown: true,
      dropdownItems: [
        {
          label: "Dashboard",
          icon: <FaUsers className="mr-2" />,
          href: "/createteam",
          requiresAuth: true,
        },
        {
          label: "Rules",
          icon: <FaUsers className="mr-2" />,
          href: "/rules",
          requiresAuth: true,
        },
        {
          label: "Challenges",
          icon: <FaLaptopCode className="mr-2" />,
          href: "/challenge",
          requiresAuth: true,
        },
        {
          label: "Teams",
          icon: <FaUsers className="mr-2" />,
          href: "/teams",
          requiresAuth: true,
        },
        {
          label: "Scoreboard",
          icon: <FaChartBar className="mr-2" />,
          href: "/scoreboard",
          requiresAuth: true,
        },
        {
          label: "Settings",
          icon: <FaUsers className="mr-2" />,
          href: "/settings",
          requiresAuth: true,
        },
        {
          label: "notifications",
          icon: < FaBell className="mr-2" />,
          href: "/notifications",
          requiresAuth: true,
        },
        {
          label: "Users",
          icon: <FaUsers className="mr-2" />,
          href: "/users",
          requiresAuth: true,
        },
        {
          label: "Login",
          icon: <FaSignInAlt className="mr-2" />,
          href: "/login",
          requiresAuth: false,
        },
        {
          label: "Sign Up",
          icon: <FaUserPlus className="mr-2" />,
          href: "/signup",
          requiresAuth: false,
        },
      ],
    },
  ];

  // Logout functionality
  const handleLogout = async () => {
    try {
      await logout(token);
      clearToken();
    } catch (error) {
      console.error("Logout error:", error);
    }
    navigate("/");
  };

  // Handle dropdown toggle
  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (openDropdown !== null) setOpenDropdown(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openDropdown]);

  // Handle navigation with auth check
  const handleNavigation = (path, requiresAuth) => {
    if (requiresAuth && !isLoggedIn) {
      navigate("/login");
    } else {
      navigate(path);
    }
    setOpenDropdown(null);
    if (isMenuOpen) setMenuOpen(false);
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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Render navigation item
  const renderNavItem = (item, index) => (
    <div
      key={index}
      className="relative"
      onClick={(e) => {
        e.stopPropagation();
        if (item.dropdown) handleDropdownToggle(index);
      }}
    >
      <div
        className={`
          flex items-center rounded-lg font-medium transition-colors duration-200 cursor-pointer
          ${item.color} ${item.hover} px-4 py-2 text-sm md:text-base
        `}
      >
        {item.icon}
        <span>{item.label}</span>
        {item.dropdown && <FaCaretDown className="ml-1" />}
      </div>

      {/* Dropdown menu */}
      {item.dropdown && openDropdown === index && (
        <div className="absolute z-50 mt-1 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            {item.dropdownItems
              .filter((dropdownItem) =>
                isLoggedIn ? true : !dropdownItem.requiresAuth
              )
              .map((dropdownItem, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={() =>
                    handleNavigation(
                      dropdownItem.href,
                      dropdownItem.requiresAuth
                    )
                  }
                  className={`
                    block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700
                    ${
                      dropdownItem.color || item.color
                    } transition-colors duration-200
                  `}
                >
                  <div className="flex items-center">
                    {dropdownItem.icon}
                    <span>{dropdownItem.label}</span>
                  </div>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );

  // Render mobile navigation item
  const renderMobileNavItem = (item, index) => (
    <div key={index} className="py-2">
      {/* Parent item */}
      <div
        onClick={() => {
          if (item.dropdown) handleDropdownToggle(index);
        }}
        className={`
          flex items-center justify-between rounded-lg font-medium transition-colors duration-200 cursor-pointer
          ${item.color} ${item.hover} px-4 py-3
        `}
      >
        <div className="flex items-center">
          {item.icon}
          <span>{item.label}</span>
        </div>
        {item.dropdown && (
          <FaCaretDown
            className={openDropdown === index ? "transform rotate-180" : ""}
          />
        )}
      </div>

      {/* Mobile dropdown menu */}
      {item.dropdown && openDropdown === index && (
        <div className="mt-2 pl-6 space-y-2">
          {item.dropdownItems
            .filter((dropdownItem) =>
              isLoggedIn ? true : !dropdownItem.requiresAuth
            )
            .map((dropdownItem, itemIndex) => (
              <button
                key={itemIndex}
                onClick={() =>
                  handleNavigation(dropdownItem.href, dropdownItem.requiresAuth)
                }
                className={`
                  block w-full text-left px-4 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700
                  ${
                    dropdownItem.color || item.color
                  } transition-colors duration-200
                `}
              >
                <div className="flex items-center">
                  {dropdownItem.icon}
                  <span>{dropdownItem.label}</span>
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  );

  // If navbar is hidden, don't render
  if (!isVisible) return null;

  return (
    <nav
      className={`
        fixed w-full z-50 transition-all duration-300
        ${
          scrolledDown
            ? "bg-white/90 dark:bg-gray-900/90 shadow-md"
            : "bg-white/70 dark:bg-gray-900/70"
        }
        backdrop-blur-md py-2
      `}
    >
      {/* Main navbar container */}
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {navItems.map((item, index) => renderNavItem(item, index))}
        </div>

        {/* Right section: Auth buttons & dark mode toggle */}
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <div className="hidden md:flex items-center space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-700 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center space-x-1 px-4 py-2 text-sm font-medium rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
            >
              <FaDoorOpen className="mr-1" />
              <span>Logout</span>
            </button>
          )}

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
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item, index) => renderMobileNavItem(item, index))}

            {/* Mobile Auth Buttons */}
            {!isLoggedIn ? (
              <div className="grid grid-cols-2 gap-2 py-4">
                <button
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                  className="w-full py-2 text-center text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setMenuOpen(false);
                  }}
                  className="w-full py-2 text-center text-sm font-medium text-white bg-blue-600 dark:bg-blue-700 rounded-lg"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center w-full py-2 px-4 mt-4 text-left text-sm font-medium rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <FaDoorOpen className="mr-2" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
