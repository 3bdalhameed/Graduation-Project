import styles from "../styles/navbar.module.css";
import logo from "../../../pages/img/JuCC_logo.png";
import logo2 from "../../../pages/img/JuCC_logo-11.png";
import { useTheme } from "../../../context/ThemeContext";

const Logo = () => {
  const { darkMode } = useTheme();
  
  return (
    <a href="/" className={`${styles.logoContainer} group`}>
      <img 
        src={darkMode ? logo : logo2} 
        alt="Logo" 
        className={`${styles.logo} group-hover:scale-110`} 
      />
    </a>
  );
};

export default Logo;
