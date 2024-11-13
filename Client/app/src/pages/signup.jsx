import React, { useState } from "react";
import "./signup.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gmail, setGmail] = useState("");

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, gmail }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("SignUp successful");
        // Optionally, redirect the user or save token to localStorage, etc.
      } else {
        alert("SignUp failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <header>
        <a href="App.jsx" className="logo">
          <img src="" alt="logo" />
        </a>
        <nav className="navigation">
          <a href="#">Log In</a>
          <a href="#">Our Team</a>
          <a href="#">Contact</a>
          <a href="#">About Us</a>
        </nav>
      </header>
      <div className="vid-container">
        <div className="inner-container">
          <div className="box">
            <h1>Sign Up</h1>
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Sign Up</button>
            <p>
              Already a member? <a href="./login">LogIn</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
