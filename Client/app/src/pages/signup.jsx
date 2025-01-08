import React, { useState } from "react";
import Navbar from "../components/Navbar_logon/navbar";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gmail, setGmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email: gmail }),
      });

      if (response.ok) {
        setSuccess("SignUp successful! You can now log in.");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setGmail("");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "SignUp failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      {/* Animated Background */}
      <div className="relative w-full h-full min-h-screen overflow-hidden bg-black">
        <div className="fixed inset-0 bg-black">
          <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
        </div>

        {/* Navbar */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black shadow-md">
          <Navbar />
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md z-10">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
              Sign Up
            </h1>
            {error && (
              <p className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-3 rounded mb-4">
                {error}
              </p>
            )}
            {success && (
              <p className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-3 rounded mb-4">
                {success}
              </p>
            )}
            <form className="space-y-6" onSubmit={handleSignup}>
              {/* Username Input */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  required
                />
              </div>
              {/* Gmail Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                >
                  Gmail
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your Gmail"
                  value={gmail}
                  onChange={(e) => setGmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  required
                />
              </div>
              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  required
                />
              </div>
              {/* Confirm Password Input */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  required
                />
              </div>
              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 dark:bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                Sign Up
              </button>
            </form>
            <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
              Already have an account?{" "}
              <a href="./login" className="text-blue-500 dark:text-blue-400 hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
