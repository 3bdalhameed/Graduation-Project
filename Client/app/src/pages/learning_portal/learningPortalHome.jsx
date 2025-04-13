import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen relative pt-16"> {/* Added pt-16 for navbar space */}
        {/* Gradient background with subtle patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 -z-10">
          {/* Grid background */}
          <div className="absolute inset-0 bg-grid bg-[length:30px_30px] opacity-[0.03] dark:opacity-[0.02]"></div>
          
          {/* Background gradient circles for visual interest */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-purple-200/10 dark:bg-purple-900/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 px-6 py-20 w-full max-w-6xl mx-auto">
          {/* Animated Heading with same styling as other pages */}
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to JUCC Learning Portal
          </motion.h1>

          {/* Subtitle with improved styling */}
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 mb-12 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Enhance your skills with our structured learning materials and challenging assessments.
          </motion.p>

          {/* Card Container with improved layout and styling */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Learning Materials Card with styling consistent with your design */}
            <motion.div
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full md:w-96 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <div className="bg-blue-100/50 dark:bg-blue-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl text-blue-600 dark:text-blue-400">📚</span>
              </div>
              <h2 className="text-2xl font-semibold mb-3 text-center text-gray-800 dark:text-white">Learning Materials</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
                Access in-depth study materials, interactive tutorials, and learning resources.
              </p>
              <button
                onClick={() => navigate("/learningPortalMaterials")}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
              >
                {/* Shimmer effect like on login page */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                </div>
                <span className="relative z-10">Get Started</span>
              </button>
            </motion.div>

            {/* Take Assessments Card */}
            <motion.div
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full md:w-96 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <div className="bg-green-100/50 dark:bg-green-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl text-green-600 dark:text-green-400">📝</span>
              </div>
              <h2 className="text-2xl font-semibold mb-3 text-center text-gray-800 dark:text-white">Take Assessments</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
                Challenge yourself with assessments to test and validate your knowledge.
              </p>
              <button
                onClick={() => navigate("/learningPortalAssessments")}
                className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 dark:from-green-500 dark:to-green-600 dark:hover:from-green-600 dark:hover:to-green-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                </div>
                <span className="relative z-10">Start Now</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
