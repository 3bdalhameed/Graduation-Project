// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/signup";  // Adjust path if necessary
import Home from "./pages/Home";      // Adjust path if necessary
import Login from "./pages/login";    // Import Login component if it exists
import Test from "./pages/test";
import Createchallenge from "./pages/Challenge";


function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/createchallenge" element={<Createchallenge />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;