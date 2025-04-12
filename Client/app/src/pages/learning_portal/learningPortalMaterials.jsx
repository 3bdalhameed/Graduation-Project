import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const learningMaterials = [
  { id: 1, title: "What is Cybersecurity?", category: "Introduction", description: "Learn the basics of cybersecurity and its importance.", link: "/learning/cybersecurity" },
  { id: 2, title: "CTF (Capture The Flag) Introduction", category: "Introduction", description: "Explore the fundamentals of CTF competitions and challenges.", link: "/learning/ctf-intro" },
  { id: 3, title: "Web Exploitation", category: "Web Security", description: "Learn how to analyze and exploit vulnerabilities in web applications.", link: "/learning/web-exploitation" },
  { id: 4, title: "Forensics", category: "Digital Forensics", description: "Investigate digital artifacts and uncover hidden data.", link: "/learning/forensics" },
  { id: 5, title: "Cryptography", category: "Crypto", description: "Understand encryption, decryption, and cryptographic attacks.", link: "/learning/cryptography" },
  { id: 6, title: "Reverse Engineering", category: "Reverse Engineering", description: "Decompile and analyze binaries to understand program logic.", link: "/learning/reverse-engineering" },
  { id: 7, title: "Pwn (Binary Exploitation)", category: "Binary Exploitation", description: "Exploit vulnerabilities in binary programs to gain control.", link: "/learning/pwn" },
  { id: 8, title: "SQL Injection", category: "Web Security", description: "Learn how to exploit databases using SQL injection techniques.", link: "/learning/sql-injection" },
  { id: 9, title: "XSS (Cross-Site Scripting)", category: "Web Security", description: "Understand how attackers inject scripts into web pages.", link: "/learning/xss" },
];

export default function LearningMaterials() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Introduction",
    "Web Security",
    "Digital Forensics",
    "Crypto",
    "Reverse Engineering",
    "Binary Exploitation",
  ];

  const filteredMaterials = selectedCategory === "All"
    ? learningMaterials
    : learningMaterials.filter((material) => material.category === selectedCategory);

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
        
        {/* Sidebar Filter */}
        <aside className="w-64 min-h-screen bg-white dark:bg-gray-800 p-6 shadow-lg pt-20">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Filter by Category</h2>
          <div className="space-y-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`w-full py-2 px-4 rounded-lg text-left font-medium transition ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 pt-20">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">
            Cybersecurity & CTF Fundamentals
          </h1>

          {/* Learning Materials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <div
                key={material.id}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform border border-gray-200 dark:border-gray-700"
                onClick={() => navigate(material.link)}
              >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {material.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{material.description}</p>
                <span className="block mt-4 text-sm font-semibold text-blue-500 dark:text-blue-400">
                  Read More →
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
