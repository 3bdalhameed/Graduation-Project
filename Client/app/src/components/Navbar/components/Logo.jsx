import React from "react";
import styles from "../styles/navbar.module.css";
import logo from "../../../pages/img/JuCC_logo.png";

const Logo = () => {
  return (
    <a href="/" className={`${styles.logoContainer} group`}>
      <img src={logo} alt="Logo" className={`${styles.logo} group-hover:scale-110`} />
    </a>
  );
};

export default Logo;
