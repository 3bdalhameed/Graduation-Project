// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/registration/signup";  // Adjust path if necessary
import Home from "./pages/home/Home";      // Adjust path if necessary
import Login from "./pages/registration/login";    // Import Login component if it exists
import Test from "./pages/test";
import Createchallenge from "./pages/challenge/Challenge";


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
                </Routes>
            </div>
        </Router>
    );
}

export default App;