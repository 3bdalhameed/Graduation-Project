import React from "react";
import Main from "../../components/main/main";
import Project from "../../components/project/project";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/Navbar/navbar";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Main content wrapper */}
      <div className="flex-grow">
        {/* Subtle background elements */}
        <div className="fixed inset-0 bg-[#f8fafc] dark:bg-gray-950">
          {/* Grid background */}
          <div className="absolute inset-0 bg-grid bg-[length:40px_40px] opacity-[0.03] dark:opacity-[0.02]"></div>
          
          {/* Background gradient circles for visual interest */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-3xl"></div>
        </div>
        
        {/* Page content with proper spacing and organization */}
        <div className="relative z-10">
          {/* Hero section with padding for navbar */}
          <section className="pt-20">
            <Main />
          </section>
          
          {/* Project section */}
          <section>
            <Project />
          </section>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="relative z-10">
        <Footer />
      </footer>
    </div>
  );
}

export default Home;
