import React, { useState } from "react";
import Navbar from "../../components/Navbar/navbar";

function Login() {
  const [username, setUsername] = useState(""); // Controlled input
  const [password, setPassword] = useState(""); // Controlled input
  const [loading, setLoading] = useState(false); // Loading state for the login button

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent page reload
    setLoading(true); // Show loading state
    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Login successful");
        // Save token to localStorage or other state management
        localStorage.setItem("token", data.token);
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-indigo-600">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <div className="font-bold text-gray-800 text-center mb-6 text-4xl">
            Welcome Back
          </div>
          <p className="text-gray-600 text-center mb-6">
            Sign in to your account
          </p>
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Username Input */}
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="text-right mt-1">
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          {/* Social Login Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              aria-label="Sign in with Google"
              className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            </button>
          </div>
          {/* Sign Up Link */}
          <p className="text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
