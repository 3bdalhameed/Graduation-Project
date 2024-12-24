import React, { useState } from "react";
import "./signup.css";
import Navbar from "../../components/Navbar/navbar"

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gmail, setGmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
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
        const data = await response.json();
        setSuccess("SignUp successful");
        alert("SignUp successful");
        // Optionally, save token to localStorage or redirect to login page
        // localStorage.setItem("token", data.token);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "SignUp failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="vid-container">
        <div className="inner-container">
          <div className="box">
            <h1>Sign Up</h1>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Gmail"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Sign Up</button>
            <p>
              Already a member? <a href="./login">Log In</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
