import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import NavBar from "../../components/Navbar_logon/navbar";

function Rules() {
  const rules = [
    "No attacking the competition infrastructure or other participants.",
    "Collaboration between teams is strictly prohibited.",
    "All flags must be submitted through the official scoreboard.",
    "Do not share flags, solutions, or hints with others.",
    "Follow the challenge-specific instructions and rules.",
    "Using automated tools is not allowed unless explicitly mentioned.",
    "Respect other participants and maintain good sportsmanship.",
    "Report any technical issues to the organizers immediately.",
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 shadow-md">
        <NavBar />
      </div>

      {/* Main Content */}
      <div className="pt-20 md:container md:mx-auto px-4">
        {/* Header */}
        <header className="bg-gray-800 py-8 text-center">
          <h1 className="text-4xl font-bold text-white">CTF Rules</h1>
          <p className="text-lg mt-2 text-gray-300">
            Please read and follow these rules to ensure a fair competition.
          </p>
        </header>

        {/* Divider */}
        <div className="w-4/5 mx-auto my-6 border-t border-gray-700"></div>

        {/* Rules Section */}
        <section className="bg-gray-800 shadow-lg rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">
            General Rules
          </h2>
          <ul className="list-decimal list-inside text-gray-300 space-y-4">
            {rules.map((rule, index) => (
              <li key={index} className="text-lg flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                {rule}
              </li>
            ))}
          </ul>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <a
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

export default Rules;
