import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RoleLoginPage = () => {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/api/login/", {
        email,
        password,
        role,
      });

      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.token);
        navigate(`/${role}/dashboard`);
      } else {
        setError("Invalid credentials or role mismatch.");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Login Portal</h2>

        {/* Role switcher */}
        <div className="flex justify-around mb-6">
          <button
            onClick={() => setRole("student")}
            className={`px-4 py-2 rounded-full ${
              role === "student" ? "bg-blue-600" : "bg-gray-600"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setRole("teacher")}
            className={`px-4 py-2 rounded-full ${
              role === "teacher" ? "bg-blue-600" : "bg-gray-600"
            }`}
          >
            Teacher
          </button>
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {/* Login form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
          >
            Login as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoleLoginPage;
