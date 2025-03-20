import React from "react";
import styles from "../styles/navbar.module.css";

const BurgerMenu = ({ isMenuOpen, toggleMenu }) => {
  return (
    <div
      className={styles.burgerMenu}
      onClick={toggleMenu}
      aria-label="Toggle menu"
    >
      <div className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerTopLineActive : ""}`}></div>
      <div className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerMiddleLineActive : ""}`}></div>
      <div className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerBottomLineActive : ""}`}></div>
    </div>
  );
};

export default BurgerMenu;
