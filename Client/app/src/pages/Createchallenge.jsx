import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar_logon/navbar";

const CreateChallenge = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    point: "50", // Default value
    category: "Web",
    subcategory: "SQL Injection",
    difficulty: "Easy",
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("access_token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/challenge/create/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Challenge created successfully!");
      setFormData({
        name: "",
        description: "",
        point: "50",
        category: "Web",
        subcategory: "SQL Injection",
        difficulty: "Easy",
      });
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Failed to create challenge.");
      } else {
        setError("Network error, please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg p-8 inset-y-24 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Create New Challenge
        </h2>

        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 dark:text-white">Challenge Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white border border-gray-300"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 dark:text-white">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white border border-gray-300"
              rows="4"
            />
          </div>

          {/* Point */}
          <div>
            <label className="block text-gray-700 dark:text-white">Points</label>
            <select
              name="point"
              value={formData.point}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white border border-gray-300"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 dark:text-white">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white border border-gray-300"
            >
              <option value="Web">Web</option>
              <option value="Crypto">Crypto</option>
              <option value="Reverse Engineering">Reverse Engineering</option>
              <option value="Forensics">Forensics</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
          </div>

          {/* Subcategory */}
          <div>
            <label className="block text-gray-700 dark:text-white">Subcategory</label>
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white border border-gray-300"
            >
              <option value="SQL Injection">SQL Injection</option>
              <option value="XSS">Cross-Site Scripting (XSS)</option>
              <option value="Cryptography">Cryptography</option>
              <option value="Memory Forensics">Memory Forensics</option>
              <option value="Steganography">Steganography</option>
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-gray-700 dark:text-white">Difficulty</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white border border-gray-300"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition duration-300"
          >
            Create Challenge
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChallenge;
