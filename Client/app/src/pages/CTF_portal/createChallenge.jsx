import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar_logon/navbar";

const CreateChallenge = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    points: "50",
    flag: "",
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
      setFormData({ title: "", description: "", points: "50", flag: "" });
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Failed to create challenge.");
      } else {
        setError("Network error, please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Create New Challenge
          </h2>

          {message && <p className="text-green-500 text-center">{message}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-white">Challenge Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white border border-gray-300"
              />
            </div>

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

            <div>
              <label className="block text-gray-700 dark:text-white">Points</label>
              <select
                name="points"
                value={formData.points}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white border border-gray-300"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="500">500</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-white">Flag</label>
              <input
                type="text"
                name="flag"
                value={formData.flag}
                onChange={handleChange}
                required
                placeholder="Enter the flag for this challenge"
                className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white border border-gray-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition duration-300"
            >
              Create Challenge
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateChallenge;
