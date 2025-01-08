import React from "react";
import logo from "../../pages/img/logo.png";

function FooterSection() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-700 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold mb-4">
          Copyright &copy;{" "}
          <span className="text-blue-500">JUCC</span> 2025
        </p>
        <div className="flex justify-center space-x-6">
          {/* Social Media Icons */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-blue-500"
          >
            <img
              src={logo}
              alt="Facebook"
              className="w-8 h-8 rounded-full"
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-blue-500"
          >
            <img
              src={logo}
              alt="Twitter"
              className="w-8 h-8 rounded-full"
            />
          </a>
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pinterest"
            className="hover:text-blue-500"
          >
            <img
              src={logo}
              alt="Pinterest"
              className="w-8 h-8 rounded-full"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
