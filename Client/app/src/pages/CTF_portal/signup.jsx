import React, { useState } from "react";
import Navbar from "../../components/Navbar/navbar";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaShieldAlt } from "react-icons/fa";
import { signup } from "../../api/auth";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gmail, setGmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Using API function instead of direct fetch
      await signup({ 
        username, 
        password, 
        email: gmail 
      });
      
      setSuccess("OTP sent to your email. Please verify.");
      navigate("/verify-otp", { state: { email: gmail, username, password } });
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Password strength calculation
  const calculatePasswordStrength = (password) => {
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return strength;
  };

  const passwordStrength = calculatePasswordStrength(password);
  const strengthColors = [
    "bg-red-500", 
    "bg-orange-500", 
    "bg-yellow-500", 
    "bg-green-500"
  ];
  const strengthText = [
    "Weak", 
    "Fair", 
    "Good", 
    "Strong"
  ];

  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md">
        <Navbar />
      </div>

      {/* Main SignUp Section - Full height with proper spacing */}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 py-20 px-4">
        <div className="w-full max-w-md mt-16 md:mt-12">
          <div className="relative bg-white dark:bg-gray-800 p-6 sm:p-7 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-2xl"></div>
            
            {/* Form header */}
            <div className="text-center mb-5">
              <div className="mx-auto w-14 h-14 flex items-center justify-center mb-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <FaShieldAlt className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Create Account
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">
                Sign up to start your journey with us
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className="mb-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800">
                <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
              </div>
            )}

            <form className="space-y-3" onSubmit={handleSignup}>
              {/* Username Input */}
              <div className="space-y-1">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaUser className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Gmail Input */}
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaEnvelope className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={gmail}
                    onChange={(e) => setGmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaLock className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
                    required
                  />
                </div>
                {password && (
                  <div className="mt-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Password strength: 
                        <span className={`ml-1 font-medium ${passwordStrength > 0 ? `text-${strengthColors[passwordStrength-1].split('-')[1]}-600 dark:text-${strengthColors[passwordStrength-1].split('-')[1]}-400` : ""}`}>
                          {passwordStrength > 0 ? strengthText[passwordStrength-1] : "Too weak"}
                        </span>
                      </span>
                    </div>
                    <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-full ${i < passwordStrength ? strengthColors[i] : "bg-transparent"} transition-all duration-300`}
                          style={{ width: "25%", float: "left" }}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-1">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaLock className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 ${
                      confirmPassword && password !== confirmPassword
                        ? "border-red-500 dark:border-red-500"
                        : confirmPassword
                        ? "border-green-500 dark:border-green-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    required
                  />
                  {confirmPassword && password !== confirmPassword && (
                    <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                      Passwords don't match
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || password !== confirmPassword}
                className={`relative w-full py-2 px-4 mt-2 rounded-lg text-white font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 focus:ring-offset-2 ${
                  loading || password !== confirmPassword
                    ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 hover:underline transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
