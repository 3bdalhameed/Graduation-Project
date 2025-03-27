import React from "react";
import { FaFlag, FaUsers, FaBook, FaSchool } from "react-icons/fa";
import styles from "../styles/navbar.module.css";

const NavigationLinks = ({ isMenuOpen, handleAuthRedirect }) => {
  return (
    <ul className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ""}`}>
      <li className={styles.navItem}>
        <a href="/login" className={styles.navLinkBlue}>
          <FaFlag className={styles.navIconBlue} />
          <span>CTF Portal</span>
        </a>
      </li>
      <li className={styles.navItem}>
        <a href="/learningPortalLogin" className={styles.navLinkGreen}>
          <FaBook className={styles.navIconGreen} />
          <span>Learning Portal</span>
        </a>
      </li>
      <li className={styles.navItem}>
        <a
          onClick={() => handleAuthRedirect("/login")}
          className={styles.navLinkYellow}
        >
          <FaSchool className={styles.navIconYellow} />
          <span>School Portal</span>
        </a>
      </li>
      <li className={styles.navItem}>
        <a
          onClick={() => handleAuthRedirect("/login")}
          className={styles.navLinkPurple}
        >
          <FaUsers className={styles.navIconPurple} />
          <span>Login</span>
        </a>
      </li>
    </ul>
  );
};

export default NavigationLinks;
