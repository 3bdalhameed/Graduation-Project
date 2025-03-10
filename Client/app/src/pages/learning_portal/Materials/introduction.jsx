import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/learning_Navbar_logon/navbar";

export default function IntroductionPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-8">
        <div className="max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
          
          {/* Title */}
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            Introduction to Cybersecurity & CTFs
          </h1>

          {/* Cybersecurity Overview */}
          <div className="text-gray-700 dark:text-gray-300">
            <h2 className="text-2xl font-semibold mb-4">What is Cybersecurity?</h2>
            <p className="mb-4">
              Cybersecurity is the practice of protecting computer systems, networks, and data 
              from cyber threats. It involves techniques such as encryption, network security, 
              and vulnerability assessments.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">What is CTF (Capture The Flag)?</h2>
            <p className="mb-4">
              CTF competitions are cybersecurity challenges where participants solve security-related 
              tasks to find hidden "flags". These challenges test skills in cryptography, web security, 
              forensics, and more.
            </p>
          </div>

          {/* Topics Covered */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Topics You’ll Learn:</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
                <p>🕵️ Digital Forensics</p>
              </div>
              <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
                <p>🔐 Cryptography</p>
              </div>
              <div className="bg-purple-500 text-white p-4 rounded-lg shadow-md">
                <p>💻 Web Security</p>
              </div>
              <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
                <p>📜 Reverse Engineering</p>
              </div>
              <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
                <p>⚙️ Pwn (Binary Exploitation)</p>
              </div>
              <div className="bg-teal-500 text-white p-4 rounded-lg shadow-md">
                <p>🌐 OSINT (Open-Source Intelligence)</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex gap-4 justify-center">
            <button
              onClick={() => navigate("/learningPortalMaterials")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg transition"
            >
              📖 Start Learning
            </button>
            <button
              onClick={() => navigate("/learningPortalAssessments")}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg transition"
            >
              🏆 Take Assessments
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
