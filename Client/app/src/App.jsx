// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/signup/signup";  // Adjust path if necessary
import Home from "./pages/home/Home";      // Adjust path if necessary
import Login from "./pages/login/login";    // Import Login component if it exists
import Test from "./pages/test";
import Createchallenge from "./pages/challenge/challenge";
import Scoreboard from "./pages/scoreboard/scoreboard";
import "./pages/style.css";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/challenge" element={<Createchallenge />} />
                    <Route path="/scoreboard" element={<Scoreboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;