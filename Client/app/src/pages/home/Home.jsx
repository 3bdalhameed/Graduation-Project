// src/components/Home.js
import React from "react";
import Main from "../../components/main/main";
import Project from "../../components/project/project";
import Contact from "../../components/contact/contact";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/Navbar/navbar";


function Home() {

  return (
      <header>
        <Navbar />
        <Main />
        <Project />
        <Contact />
        <Footer />
      </header>
  );
}

export default Home;
