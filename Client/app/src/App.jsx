import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserProfile from "./pages/UserProfile";
import TeamProfile from "./pages/TeamProfile.jsx"

// CTF Portal
import SignUp from "./pages/CTF_portal/signup.jsx";
import Home from "./pages/CTF_portal/Home.jsx";
import HomeLogon from "./pages/CTF_portal/HomeLogon.jsx";
import Login from "./pages/CTF_portal/login.jsx";
import Test from "./pages/test";
import Challenge from "./pages/CTF_portal/challenge.jsx";
import Createchallenge from "./pages/CTF_portal/createChallenge.jsx"
import Scoreboard from "./pages/CTF_portal/scoreboard.jsx";
import Rules from "./pages/CTF_portal/rules.jsx";
import Setting from "./pages/CTF_portal/setting.jsx";
import Users from "./pages/CTF_portal/users.jsx";
import Teams from "./pages/CTF_portal/teams.jsx";
import Createteam from "./pages/CTF_portal/createjointeam.jsx";
import Teamprof from "./pages/CTF_portal/teamprof.jsx";
import VerifyOTP from "./pages/VerifyOTP.jsx";
import TicTacToe from "./pages/ticTacToe.jsx";

// Learning Portal
import LearningPortalLoginPage from "./pages/learning_portal/learningPortalLogin.jsx";
import LearningPortalHomePage from "./pages/learning_portal/learningPortalHome.jsx";
import LearningPortalMaterials from "./pages/learning_portal/learningPortalMaterials.jsx";
import LearningPortalAssessments from "./pages/learning_portal/learningPortalAssesments.jsx";
import LearningPortalSignup from "./pages/learning_portal/learningPortalSignup.jsx";
import Introduction from "./pages/learning_portal/Materials/introduction.jsx";
import "./pages/style.css";

// School Portal
import Schoollogin from "./pages/School_portal/SchoolLogin.jsx";
import Schoolmain from "./pages/School_portal/SchoolMainPage.jsx";
import Schooladmin from "./pages/School_portal/AdminUserCreatePage.jsx";


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/profile/:username" element={<UserProfile />} />
          <Route path="/teams/:teamId" element={<TeamProfile />} />

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
          <Route path="/teams" element={<Teams />} />
          <Route path="/createteam" element={<Createteam />} />
          <Route path="/teamprofile" element={<Teamprof />} />
          <Route path="/settings" element={<Setting />} />

          
          <Route path="/learningPortalLogin" element={<LearningPortalLoginPage />} />
          <Route path="/learningPortalHome" element={<LearningPortalHomePage />} />
          <Route path="/learningPortalAssessments" element={<LearningPortalAssessments />} />
          <Route path="/learningPortalMaterials" element={<LearningPortalMaterials />} />
          <Route path="/learningPortalSignup" element={<LearningPortalSignup />} />
          <Route path="/learning/cybersecurity" element={<Introduction />} />


          <Route path="/schoollogin" element={<Schoollogin />} />          
          <Route path="/schoolmain" element={<Schoolmain />} />
          <Route path="/school/createuser" element={<Schooladmin />} />



          <Route path="/ticTacToe" element={<TicTacToe />} />
        </Routes>
      </Router>
  );
}

export default App;
