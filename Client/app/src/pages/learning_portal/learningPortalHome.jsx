import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
        {/* Animated Heading */}
        <motion.h1
          className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to JUCC Learning Portal
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg text-gray-300 mb-8 text-center max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Enhance your skills with our structured learning materials and challenging assessments.
        </motion.p>

        {/* Card Container */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Learning Materials Card */}
          <motion.div
            className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-80 text-center border border-white/20 hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-2xl font-semibold mb-3">📚 Learning Materials</h2>
            <p className="text-gray-300 mb-6 text-sm">
              Access in-depth study materials and learning resources.
            </p>
            <button
              onClick={() => navigate("/learningPortalMaterials")}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 transition text-white font-medium rounded-lg shadow-md"
            >
              Get Started
            </button>
          </motion.div>

          {/* Take Assessments Card */}
          <motion.div
            className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-80 text-center border border-white/20 hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-2xl font-semibold mb-3">📝 Take Assessments</h2>
            <p className="text-gray-300 mb-6 text-sm">
              Challenge yourself with assessments to test your knowledge.
            </p>
            <button
              onClick={() => navigate("/learningPortalAssessments")}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 transition text-white font-medium rounded-lg shadow-md"
            >
              Start Now
            </button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
