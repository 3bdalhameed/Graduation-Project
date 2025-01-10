// src/components/Home.js
import React from "react";
import Main from "../components/main/main";
import Project from "../components/project/project";
import Footer from "../components/footer/footer";
import Navbar from "../components/Navbar_logon/navbar";


function Home() {

  return (
      <header>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Navbar />
      </div>
        <Main />
        <Project />
        <Footer />
      </header>
  );
}

export default Home;
