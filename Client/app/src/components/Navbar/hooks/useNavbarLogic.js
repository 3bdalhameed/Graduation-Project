import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useTokenStore from "../../../stores/useTokenStore";
import { logout } from "../../../api/users";

export const useNavbarLogic = () => {
  // State management
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  
  // Refs for event management
  const navRef = useRef(null);
  
  const navigate = useNavigate();

  // Get token from store
  const token = useTokenStore((state) => state.token);
  const clearToken = useTokenStore((state) => state.clearToken);
  const isLoggedIn = !!token;

  // Logout functionality
  const handleLogout = async () => {
    try {
      clearToken();
      await logout(token);
    } catch (error) {
      console.error("Logout error:", error);
    }
    navigate("/");
  };

  // Handle dropdown toggle
  const handleDropdownToggle = useCallback((index, event) => {
    if (event) event.stopPropagation();
    setOpenDropdown(openDropdown === index ? null : index);
  }, [openDropdown]);

  // Handle navigation with auth check
  const handleNavigation = useCallback((path, requiresAuth) => {
    if (requiresAuth && !isLoggedIn) {
      navigate("/login");
    } else {
      navigate(path);
    }
    setOpenDropdown(null);
    if (isMenuOpen) setMenuOpen(false);
  }, [isLoggedIn, isMenuOpen, navigate]);

  // Handle scroll behavior
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Only hide navbar after scrolling down a significant amount
    if (currentScrollY > lastScrollY && currentScrollY > 150) {
      setIsVisible(false); // Hide on scroll down
    } else {
      setIsVisible(true); // Show on scroll up
    }

    // Update the scrolled state for styling
    setScrolledDown(currentScrollY > 20);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  // Handle menu toggle
  const toggleMenu = useCallback((value) => {
    if (typeof value === 'boolean') {
      setMenuOpen(value);
    } else {
      setMenuOpen((prev) => !prev);
    }
  }, []);

  // Close both dropdown and menu with a single action
  const closeAllMenus = useCallback(() => {
    setOpenDropdown(null);
    setMenuOpen(false);
  }, []);

  // Setup scroll event listener with throttling for better performance
  useEffect(() => {
    let scrollTimer;
    const throttledScroll = () => {
      if (!scrollTimer) {
        scrollTimer = setTimeout(() => {
          handleScroll();
          scrollTimer = null;
        }, 100);
      }
    };

    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      clearTimeout(scrollTimer);
    };
  }, [handleScroll]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
        // Close dropdowns on desktop resize
        setOpenDropdown(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only process click outside if dropdown or menu is open
      if (openDropdown === null && !isMenuOpen) return;
      
      // Close menu/dropdown if clicked outside navbar
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeAllMenus();
      }
    };

    // Attach listener to document body
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown, isMenuOpen, closeAllMenus]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      // ESC key closes dropdowns
      if (event.key === "Escape") {
        closeAllMenus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeAllMenus]);

  return {
    isMenuOpen,
    isVisible,
    scrolledDown,
    openDropdown,
    isLoggedIn,
    navRef,
    setOpenDropdown,
    handleDropdownToggle,
    handleNavigation,
    handleLogout,
    toggleMenu,
    closeAllMenus
  };
};