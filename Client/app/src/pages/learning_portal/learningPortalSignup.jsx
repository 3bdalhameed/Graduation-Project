import React, { useState } from "react";
import Navbar from "../../components/Navbar/navbar";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gmail, setGmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
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
        setSuccess("OTP sent to your email. Please verify.");
        navigate("/verify-otp", { state: { email: gmail, username, password } });
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
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md">
        <Navbar />
      </div>

      {/* Main SignUp Section */}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-2">
            Create an Account
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Sign up to start your journey with us.
          </p>

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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                required
              />
            </div>

            {/* Gmail Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={gmail}
                onChange={(e) => setGmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-300 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500"
            >
              Sign Up
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <a
              href="/learningPortalLogin"
              className="text-blue-500 dark:text-blue-400 font-medium hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
