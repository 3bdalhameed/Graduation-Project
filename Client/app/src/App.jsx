import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/signup.jsx";
import Home from "./pages/Home.jsx";
import HomeLogon from "./pages/HomeLogon.jsx";
import Login from "./pages/login.jsx";
import Test from "./pages/test";
import Createchallenge from "./pages/challenge.jsx";
import Scoreboard from "./pages/scoreboard.jsx";
import Rules from "./pages/rules.jsx";
import Setting from "./pages/setting.jsx";
import "./pages/style.css";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<HomeLogon />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/test" element={<Test />} />
          <Route path="/challenge" element={<Createchallenge />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/settings" element={<Setting />} />
        </Routes>
      </Router>
  );
}

export default App;
