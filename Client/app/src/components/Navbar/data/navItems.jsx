import React from "react";
import {
  FaFlag,
  FaBook,
  FaSchool,
  FaUserGraduate,
  FaChartBar,
  FaLaptopCode,
  FaUsers,
  FaLock,
  FaSignInAlt,
  FaUserPlus,
  FaBell,
} from "react-icons/fa";

export const navItems = [
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
        description: "Start your learning journey"
      },
      {
        label: "Materials",
        icon: <FaLaptopCode className="mr-2" />,
        href: "/learningPortalMaterials",
        requiresAuth: true,
        description: "Access learning resources and tutorials"
      },
      {
        label: "Assessments",
        icon: <FaUserGraduate className="mr-2" />,
        href: "/learningPortalAssessments",
        requiresAuth: true,
        description: "Test your knowledge and skills"
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
        description: "View your school dashboard"
      },
      {
        label: "Admin Panel",
        icon: <FaLock className="mr-2" />,
        href: "/school/createuser",
        requiresAuth: true,
        description: "Manage school administration"
      },
      {
        label: "Login",
        icon: <FaSignInAlt className="mr-2" />,
        href: "/schoollogin",
        requiresAuth: false,
        description: "Access school administration"
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
        label: "Home",
        icon: <FaBook className="mr-2" />,
        href: "/ctfhome",
        requiresAuth: true,
        description: "Start your learning journey"
      },
      {
        label: "Dashboard",
        icon: <FaUsers className="mr-2" />,
        href: "/dashboard",
        requiresAuth: true,
        description: "View your CTF statistics"
      },
      {
        label: "Rules",
        icon: <FaUsers className="mr-2" />,
        href: "/rules",
        requiresAuth: true,
        description: "Learn about competition rules"
      },
      {
        label: "Challenges",
        icon: <FaLaptopCode className="mr-2" />,
        href: "/challenge",
        requiresAuth: true,
        description: "Solve cybersecurity challenges"
      },
      {
        label: "Scoreboard",
        icon: <FaChartBar className="mr-2" />,
        href: "/scoreboard",
        requiresAuth: true,
        description: "Check the competition rankings"
      },
      {
        label: "Notifications",
        icon: <FaBell className="mr-2" />,
        href: "/notifications",
        requiresAuth: true,
        description: "View your notifications"
      },
      {
        label: "Users",
        icon: <FaUsers className="mr-2" />,
        href: "/users",
        requiresAuth: true,
        description: "Browse community members"
      },
    ],
  },
];