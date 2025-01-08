import React from "react";
import hacker from "../../pages/img/hacker.png";
import Button from "../encryptbutton.jsx";

function MainSection() {
  return (
    <section className="relative overflow-hidden py-20 bg-gray-900 text-white">
      {/* Moving Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 animate-background"></div>

      <div className="relative container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="text-center md:text-left mb-8 md:mb-0 md:w-1/2">
          <p className="text-5xl font-bold mb-4">
            Welcome to <span className="text-blue-600">JuCC</span>
          </p>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Enhance your development experience with exciting challenges, engaging projects, and a vibrant community.
          </p>
          <button className=" bg-blue-800 rounded-lg shadow-lg">
            <Button />
          </button>
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

export default MainSection;
