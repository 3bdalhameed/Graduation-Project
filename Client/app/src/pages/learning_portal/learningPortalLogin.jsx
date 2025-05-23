import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTokenStore from "../../stores/useTokenStore";
import { login } from "../../api/auth";

function LearningPortalLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setToken = useTokenStore((state) => state.setToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Use the API function instead of direct fetch
      const data = await login(username, password);
      setToken(data.access_token);
      navigate("/learningPortalHome");
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Main Login Section */}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-2">
            Welcome to the Learning Portal
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Sign in to continue to your account
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
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
                name="username"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                name="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                required
              />
              <div className="text-right mt-1">
                <a
                  href="#"
                  className="text-sm text-blue-500 dark:text-blue-400 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-300 ${
                loading
                  ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                  : "bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500"
              }`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mx-3">OR</p>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
          </div>

          {/* Social Login */}
          <div className="flex justify-center space-x-4">
            <button
              aria-label="Sign in with Google"
              className="p-3 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current text-gray-600 dark:text-gray-300"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-blue-500 dark:text-blue-400 font-medium hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default LearningPortalLogin;
