import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaFlag, FaUsers, FaBook, FaSchool, FaBell, FaUserFriends, FaCog, FaTrophy, FaClipboardList
} from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import Logo from "./components/Logo";
import BurgerMenu from "./components/BurgerMenu";
import DarkModeToggle from "./components/DarkModeToggle";

const NavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [portal, setPortal] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const scrollHandler = () => {
      setIsVisible(window.scrollY <= lastScrollY || window.scrollY < 100);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [lastScrollY]);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    const storedRole = localStorage.getItem("role"); // 'admin', 'user', 'teacher', 'student'
    const storedPortal = localStorage.getItem("portal"); // 'ctf', 'learning', 'school'
    setToken(storedToken);
    setRole(storedRole);
    setPortal(storedPortal);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const baseLinks = [
    { label: "CTF Portal", icon: <FaFlag />, href: "/login" },
    { label: "Learning Portal", icon: <FaBook />, href: "/learning" },
    { label: "School Portal", icon: <FaSchool />, href: "/school" },
  ];

  const userLinks = {
    ctf: [
      { label: "Rules", icon: <FaClipboardList />, href: "/ctf/rules" },
      { label: "Scoreboard", icon: <FaTrophy />, href: "/ctf/scoreboard" },
      { label: "Challenges", icon: <FaFlag />, href: "/ctf/challenges" },
      { label: "Notifications", icon: <FaBell />, href: "/ctf/notifications" },
      { label: "Users", icon: <FaUsers />, href: "/ctf/users" },
      { label: "Teams", icon: <FaUserFriends />, href: "/ctf/teams" },
      { label: "Settings", icon: <FaCog />, href: "/ctf/settings" },
    ],
    learning: [
      { label: "Assessments", icon: <FaClipboardList />, href: "/learning/assessments" },
      { label: "Learning", icon: <FaBook />, href: "/learning/modules" },
      { label: "Settings", icon: <FaCog />, href: "/learning/settings" },
    ],
    school: role === "teacher"
      ? [
          { label: "Courses", icon: <FaBook />, href: "/school/courses" },
          { label: "Quizzes", icon: <FaClipboardList />, href: "/school/quizzes" },
          { label: "Assignments", icon: <FaClipboardList />, href: "/school/assignments" },
          { label: "Students", icon: <FaUsers />, href: "/school/students" },
          { label: "Settings", icon: <FaCog />, href: "/school/settings" },
        ]
      : [
          { label: "Courses", icon: <FaBook />, href: "/school/courses" },
          { label: "Quizzes", icon: <FaClipboardList />, href: "/school/quizzes" },
          { label: "Assignments", icon: <FaClipboardList />, href: "/school/assignments" },
          { label: "Settings", icon: <FaCog />, href: "/school/settings" },
        ],
  };

  if (role === "admin") {
    userLinks[portal].push({
      label: "Admin Panel",
      icon: <MdAdminPanelSettings />,
      href: `/${portal}/admin`,
    });
  }

  const linksToRender = token && portal ? userLinks[portal] : baseLinks;

  return (
    <nav className={`fixed w-full z-50 shadow-md transition-all duration-300 ease-in-out backdrop-blur-md bg-white/90 dark:bg-gray-900/90 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center space-x-6">
          {linksToRender.map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.href)}
              className="flex items-center gap-2 text-sm hover:text-blue-500 transition"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          {token && (
            <button onClick={handleLogout} className="text-sm text-red-500 hover:underline ml-4">Logout</button>
          )}
        </div>
        <DarkModeToggle />
        <BurgerMenu isMenuOpen={isMenuOpen} toggleMenu={() => setMenuOpen(!isMenuOpen)} />
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-6 py-4">
          {linksToRender.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                navigate(item.href);
                setMenuOpen(false);
              }}
              className="block w-full py-2 text-left text-sm border-b border-gray-200 dark:border-gray-700"
            >
              {item.label}
            </button>
          ))}
          {token && (
            <button onClick={handleLogout} className="text-red-500 w-full text-left mt-2">Logout</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
