import React from "react";
import hacker from "../../pages/img/hacker.png";

function Main() {
  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="text-center md:text-left mb-8 md:mb-0 md:w-1/2">
          <p className="text-4xl font-bold mb-4">
            <span className="text-blue-500 text-7xl">JuCC</span>
          </p>
          <p className="text-2xl text-gray-300 mb-6">
            Improving Your Development Experience
          </p>
          <a
            href="#projects"
            className="w-80 text-center text-2xl inline-block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Explore Projects
          </a>
        </div>
        {/* Image Content */}
        <div className="md:w-1/2">
          <img
            src={hacker}
            alt="Main visual"
            className="w-full max-w-md mx-auto md:max-w-full"
          />
        </div>
      </div>
    </section>
  );
}

export default Main;
