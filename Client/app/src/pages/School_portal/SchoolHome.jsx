import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SchoolPortalHome() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen relative pt-16">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 -z-10">
          <div className="absolute inset-0 bg-grid bg-[length:30px_30px] opacity-[0.03] dark:opacity-[0.02]"></div>
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-green-200/20 dark:bg-green-900/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-yellow-200/10 dark:bg-yellow-900/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 px-6 py-20 w-full max-w-6xl mx-auto">
          {/* Animated Heading */}
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to JUCC School Portal
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 mb-12 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Learn, teach, and track progress. Access your courses, assignments, and quizzes all in one place.
          </motion.p>

          {/* Card Container */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Courses Card */}
            <motion.div
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full md:w-96 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <div className="bg-green-100/50 dark:bg-green-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl text-green-600 dark:text-green-400">📚</span>
              </div>
              <h2 className="text-2xl font-semibold mb-3 text-center text-gray-800 dark:text-white">Courses</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
                Access your enrolled courses, view materials, and stay organized throughout your learning journey.
              </p>
              <button
                onClick={() => navigate("/school/courses")}
                className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                </div>
                <span className="relative z-10">Go to Courses</span>
              </button>
            </motion.div>

            {/* Assignments/Quizzes Card */}
            <motion.div
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full md:w-96 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <div className="bg-yellow-100/50 dark:bg-yellow-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl text-yellow-600 dark:text-yellow-400">📝</span>
              </div>
              <h2 className="text-2xl font-semibold mb-3 text-center text-gray-800 dark:text-white">Assignments & Quizzes</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
                Stay up to date with your assignments and quizzes. Submit work and check your scores easily.
              </p>
              <button
                onClick={() => navigate("/school/assignments")}
                className="w-full py-3 px-6 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                </div>
                <span className="relative z-10">View Assignments</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
