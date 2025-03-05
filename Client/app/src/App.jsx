import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/signup.jsx";
import Home from "./pages/Home.jsx";
import HomeLogon from "./pages/HomeLogon.jsx";
import Login from "./pages/login.jsx";
import Test from "./pages/test";
import Createchallenge from "./pages/challenge.jsx";
import CreateChallengee from "./pages/createChallengePage.jsx"
import Scoreboard from "./pages/scoreboard.jsx";
import Rules from "./pages/rules.jsx";
import Setting from "./pages/setting.jsx";
import Users from "./pages/users.jsx";
import Createteam from "./pages/createjointeam.jsx";
import Teamprof from "./pages/teamprof.jsx";
import VerifyOTP from "./pages/VerifyOTP.jsx";
import "./pages/style.css";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<HomeLogon />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/createChallengePage" element={<CreateChallengee />} />
          <Route path="/test" element={<Test />} />
          <Route path="/challenge" element={<Createchallenge />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/users" element={<Users />} />
          <Route path="/createteam" element={<Createteam />} />
          <Route path="/teamprofile" element={<Teamprof />} />
          <Route path="/settings" element={<Setting />} />
        </Routes>
      </Router>
  );
}

export default App;
