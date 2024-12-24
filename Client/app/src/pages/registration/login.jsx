import React, { useState } from "react";
import "./login.css";
import Navbar from '../../components/Navbar/navbar';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
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
        // Optionally, save token to localStorage, etc.
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>  <header>
          <Navbar />
        </header>
          <div className="vid-container">
              <div className="inner-container">
                  <div className="box">
                      <h1>Login</h1>
                      <input
                          type="text"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)} />
                      <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)} />
                      <button
                          onClick={handleLogin}>
                          Login
                      </button>
                      <p>
                          Not a member? <a href="./signup" className="lsignup">Sign Up</a>
                      </p>
                  </div>
              </div>
          </div></>
  );
}

export default Login;
