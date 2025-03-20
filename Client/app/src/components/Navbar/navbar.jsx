import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/navbar.module.css";

// Import components
import Logo from "./components/Logo";
import BurgerMenu from "./components/BurgerMenu";
import NavigationLinks from "./components/NavigationLinks";

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
      className={`${styles.navbarContainer} ${
        isVisible ? styles.navbarVisible : styles.navbarHidden
      }`}
    >
      <div className={styles.innerContainer}>
        <Logo />
        <BurgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <NavigationLinks 
          isMenuOpen={isMenuOpen} 
          handleAuthRedirect={handleAuthRedirect} 
        />
      </div>
    </nav>
  );
};

export default NavBar;
