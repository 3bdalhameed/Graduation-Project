import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaGithub, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import logo from "../../pages/img/JuCC_logo.png";

function FooterSection() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* About Us */}
          <div>
            <div className="mb-6 flex items-center">
              <img src={logo} alt="JUCC Logo" className="h-10 w-auto mr-2" />
              <h3 className="text-2xl font-bold text-white">JuCC</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Empowering cybersecurity enthusiasts with hands-on learning experiences and competitive challenges.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-blue-500 text-white p-2 rounded-full transition-colors duration-300">
                <FaTwitter size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-300">
                <FaFacebook size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-pink-600 text-white p-2 rounded-full transition-colors duration-300">
                <FaInstagram size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-300">
                <FaLinkedin size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-gray-600 text-white p-2 rounded-full transition-colors duration-300">
                <FaGithub size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white border-b border-blue-500 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">About Us</a></li>
              <li><a href="/login" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">CTF Portal</a></li>
              <li><a href="/login" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">School Portal</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white border-b border-blue-500 pb-2 inline-block">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-500 mr-3 mt-1" />
                <span className="text-gray-300">Amman, Jordan</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-blue-500 mr-3" />
                <a href="mailto:info@jucc.edu" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">info@jucc.edu</a>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-blue-500 mr-3" />
                <a href="tel:+962123456789" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">+962 123 456 789</a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white border-b border-blue-500 pb-2 inline-block">
              Newsletter
            </h4>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for updates</p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>
        
        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} <span className="text-blue-500 font-semibold">JUCC</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;