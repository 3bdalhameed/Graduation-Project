import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Learning materials data
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

  // Map categories to colors for visual distinction
  const categoryColors = {
    "Introduction": "blue",
    "Web Security": "purple", 
    "Digital Forensics": "teal",
    "Crypto": "green",
    "Reverse Engineering": "red",
    "Binary Exploitation": "amber"
  };

  return (
    <>
      <div className="min-h-screen relative">
        {/* Background with subtle patterns */}
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 -z-10">
          {/* Grid background */}
          <div className="absolute inset-0 bg-grid bg-[length:30px_30px] opacity-[0.03] dark:opacity-[0.02]"></div>
          
          {/* Background gradient circles */}
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-0 w-72 h-72 bg-indigo-100/30 dark:bg-purple-900/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="flex z-10 relative pt-16"> {/* Added pt-16 for navbar space */}
          {/* Sidebar Filter */}
          <aside className="w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 shadow-lg min-h-screen border-r border-gray-200 dark:border-gray-700 sticky top-16"> {/* Changed pt-20 to top-16 for navbar */}
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center mt-4"> {/* Added mt-4 for better spacing */}
              <span className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3 text-blue-600 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </span>
              Filter Categories
            </h2>
            <div className="space-y-3">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`w-full py-2.5 px-4 rounded-xl text-left font-medium transition-all duration-300 flex items-center ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-600 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {selectedCategory === category && (
                    <span className="mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  )}
                  {category}
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8 pt-12"> {/* Changed pt-24 to pt-12 to work with the new pt-16 on parent */}
            <div className="max-w-6xl mx-auto">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
              >
                Cybersecurity & CTF Learning Materials
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 dark:text-gray-400 mb-8"
              >
                Explore our comprehensive collection of cybersecurity learning resources
              </motion.p>

              {/* Learning Materials Grid */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredMaterials.map((material) => {
                  const colorKey = categoryColors[material.category] || "blue";
                  const colors = {
                    blue: "from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-600",
                    purple: "from-purple-600 to-purple-500 dark:from-purple-500 dark:to-purple-600",
                    green: "from-green-600 to-green-500 dark:from-green-500 dark:to-green-600",
                    teal: "from-teal-600 to-teal-500 dark:from-teal-500 dark:to-teal-600", 
                    red: "from-red-600 to-red-500 dark:from-red-500 dark:to-red-600",
                    amber: "from-amber-600 to-amber-500 dark:from-amber-500 dark:to-amber-600"
                  };
                  
                  const bgColors = {
                    blue: "bg-blue-100 dark:bg-blue-900/30",
                    purple: "bg-purple-100 dark:bg-purple-900/30",
                    green: "bg-green-100 dark:bg-green-900/30",
                    teal: "bg-teal-100 dark:bg-teal-900/30", 
                    red: "bg-red-100 dark:bg-red-900/30",
                    amber: "bg-amber-100 dark:bg-amber-900/30"
                  };
                  
                  const textColors = {
                    blue: "text-blue-600 dark:text-blue-400",
                    purple: "text-purple-600 dark:text-purple-400",
                    green: "text-green-600 dark:text-green-400",
                    teal: "text-teal-600 dark:text-teal-400",
                    red: "text-red-600 dark:text-red-400",
                    amber: "text-amber-600 dark:text-amber-400"
                  };
                  
                  return (
                    <motion.div
                      key={material.id}
                      whileHover={{ y: -5 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl 
                                transition-all duration-300 border border-gray-200 dark:border-gray-700
                                overflow-hidden group cursor-pointer"
                      onClick={() => navigate(material.link)}
                    >
                      {/* Top accent line */}
                      <div className={`h-1.5 bg-gradient-to-r ${colors[colorKey]}`}></div>
                      
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h2 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {material.title}
                          </h2>
                        </div>
                        
                        <div className="mb-4">
                          <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium ${bgColors[colorKey]} ${textColors[colorKey]}`}>
                            {material.category}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                          {material.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 transition-all group-hover:translate-x-1">
                            Read More
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </span>
                          
                          <div className="bg-white dark:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">{material.id}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
              
              {filteredMaterials.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 max-w-md mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 dark:text-blue-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No materials found</h3>
                    <p className="text-gray-600 dark:text-gray-400">No learning materials are available for this category yet.</p>
                  </div>
                </motion.div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
