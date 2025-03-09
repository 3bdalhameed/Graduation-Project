import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/signup.jsx";
import Home from "./pages/Home.jsx";
import HomeLogon from "./pages/HomeLogon.jsx";
import Login from "./pages/login.jsx";
import Test from "./pages/test";
import Challenge from "./pages/challenge.jsx";
import Createchallenge from "./pages/createChallenge.jsx"
import Scoreboard from "./pages/scoreboard.jsx";
import Rules from "./pages/rules.jsx";
import Setting from "./pages/setting.jsx";
import Users from "./pages/users.jsx";
import Createteam from "./pages/createjointeam.jsx";
import Teamprof from "./pages/teamprof.jsx";
import VerifyOTP from "./pages/VerifyOTP.jsx";
import TicTacToe from "./pages/ticTacToe.jsx";
import LearningPortalLoginPage from "./pages/learningPortalLogin.jsx";
import LearningPortalHomePage from "./pages/learningPortalHome.jsx";
import LearningPortalMaterials from "./pages/learningPortalMaterials.jsx";
import LearningPortalAssessments from "./pages/learningPortalAssesments.jsx";
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
          <Route path="/test" element={<Test />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/createchallenge" element={<Createchallenge />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/users" element={<Users />} />
          <Route path="/createteam" element={<Createteam />} />
          <Route path="/teamprofile" element={<Teamprof />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/learningPortalLogin" element={<LearningPortalLoginPage />} />
          <Route path="/learningPortalHome" element={<LearningPortalHomePage />} />
          <Route path="/learningPortalAssessments" element={<LearningPortalAssessments />} />
          <Route path="/learningPortalMaterials" element={<LearningPortalMaterials />} />
          <Route path="/ticTacToe" element={<TicTacToe />} />
        </Routes>
      </Router>
  );
}

export default App;
