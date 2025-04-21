import React from "react";
import { useNavigate } from "react-router-dom";

export default function IntroductionPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-8">
        <div className="max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
          
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-6">
            👨‍💻 Introduction to Cybersecurity & CTFs
          </h1>

          {/* Cybersecurity Overview */}
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
            <h2 className="text-2xl font-semibold mb-4">🔒 What is Cybersecurity?</h2>
            <p className="mb-6">
              Cybersecurity is the practice of protecting computer systems, networks, and data 
              from cyber threats. It involves techniques such as encryption, network security, 
              and vulnerability assessments. A strong cybersecurity foundation is essential in the digital age.
            </p>

            <h2 className="text-2xl font-semibold mb-4">🎯 What is CTF (Capture The Flag)?</h2>
            <p className="mb-6">
              CTF competitions are hands-on cybersecurity challenges where participants solve security-related 
              tasks to discover hidden "flags". These challenges test and sharpen skills in areas like cryptography, 
              web security, reverse engineering, and forensics in a gamified environment.
            </p>
          </div>

          {/* Topics Covered */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">📚 Topics You’ll Learn:</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                ["🕵️", "Digital Forensics"],
                ["🔐", "Cryptography"],
                ["💻", "Web Security"],
                ["📜", "Reverse Engineering"],
                ["⚙️", "Pwn (Binary Exploitation)"],
                ["🌐", "OSINT"]
              ].map(([icon, label], index) => (
                <div key={index} className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-4 rounded-xl shadow-md">
                  <p className="text-lg font-semibold">{icon} {label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate("/learningPortalMaterials")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-semibold transition"
            >
              📖 Start Learning
            </button>
            <button
              onClick={() => navigate("/learningPortalAssessments")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-semibold transition"
            >
              🏆 Take Assessments
            </button>
          </div>
        </div>
      </div>
    </>
  );
}