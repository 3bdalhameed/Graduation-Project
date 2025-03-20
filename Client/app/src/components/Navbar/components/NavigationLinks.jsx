import React from "react";
import { FaFlag, FaUsers, FaBook, FaSchool } from "react-icons/fa";
import styles from "../styles/navbar.module.css";

const NavigationLinks = ({ isMenuOpen, handleAuthRedirect }) => {
  return (
    <ul className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ""}`}>
      <li className={styles.navItem}>
        <FaFlag className={styles.navIconBlue} />
        <a href="/login" className={styles.navLinkBlue}>
          CTF Portal
        </a>
      </li>
      <li className={styles.navItem}>
        <FaBook className={styles.navIconGreen} />
        <a href="/learningPortalLogin" className={styles.navLinkGreen}>
          Learning Portal
        </a>
      </li>
      <li className={styles.navItem}>
        <FaSchool className={styles.navIconYellow} />
        <a
          onClick={() => handleAuthRedirect("/login")}
          className={styles.navLinkYellow}
        >
          School Portal
        </a>
      </li>
      <li className={styles.navItem}>
        <FaUsers className={styles.navIconPurple} />
        <a
          onClick={() => handleAuthRedirect("/login")}
          className={styles.navLinkPurple}
        >
          Login
        </a>
      </li>
    </ul>
  );
};

export default NavigationLinks;
