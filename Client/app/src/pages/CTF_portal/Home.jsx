import React from "react";
import Main from "../../components/main/main";
import Project from "../../components/project/project";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/Navbar/navbar";

function Home() {
  return (
    <div className="relative">
      <header>
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
          <Navbar />
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-grid opacity-[0.07] dark:opacity-[0.05] z-0"></div>
          
          <Main />
          <Project />
        </div>
        
        <Footer />
      </header>
    </div>
  );
}

export default Home;
