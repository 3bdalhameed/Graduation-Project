import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar.jsx";
import ScrollToTop from "./components/ScrollToTop"; 
import Test from "./pages/test";

import SignUp from "./pages/CTF_portal/signup.jsx";
import Login from "./pages/CTF_portal/login.jsx";

import UserProfile from "./pages/UserProfile";
import TeamProfile from "./pages/TeamProfile.jsx";
import Adminlogs from "./pages/adminlogs.jsx";
import Chatbot from "./pages/chatbot.jsx";


import VerifyOTP from "./pages/VerifyOTP.jsx";


// Services
import Awareness from "./pages/Services/Awareness.jsx";
import Assessment from "./pages/Services/Assessment.jsx";
import CyberHub from "./pages/Services/CyberHub.jsx";
import JCCT from "./pages/Services/JCCT.jsx";

// CTF Portal
import CTFHome from "./pages/CTF_portal/CTFHome.jsx"
import Home from "./pages/CTF_portal/Home.jsx";
import Challenge from "./pages/CTF_portal/challenge.jsx";
import Createchallenge from "./pages/CTF_portal/createChallenge.jsx";
import Scoreboard from "./pages/CTF_portal/scoreboard.jsx";
import Rules from "./pages/CTF_portal/rules.jsx";
import Setting from "./pages/CTF_portal/setting.jsx";
import Users from "./pages/CTF_portal/users.jsx";
import Teams from "./pages/CTF_portal/teams.jsx";
import Createteam from "./pages/CTF_portal/createjointeam.jsx";
import Teamprof from "./pages/CTF_portal/teamprof.jsx";
import Notifications from "./pages/CTF_portal/notifications.jsx";

// Learning Portal
import LearningPortalHomePage from "./pages/learning_portal/learningPortalHome.jsx";
import LearningPortalMaterials from "./pages/learning_portal/learningPortalMaterials.jsx";
import LearningPortalAssessments from "./pages/learning_portal/learningPortalAssesments.jsx";
import Introduction from "./pages/learning_portal/Materials/introduction.jsx";
import AdminPanel from "./pages/learning_portal/admin-panel.jsx"
import "./pages/style.css";

// School Portal
import Schoollogin from "./pages/School_portal/SchoolLogin.jsx";
import Schoolmain from "./pages/School_portal/SchoolMainPage.jsx";
import Schooladmin from "./pages/School_portal/AdminUserCreatePage.jsx";
import SchoolHome from "./pages/School_portal/SchoolHome.jsx";


import TicTacToe from "./pages/ticTacToe.jsx";


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/profile/:username" element={<UserProfile />} />
        <Route path="/teams/:teamId" element={<TeamProfile />} />
        <Route path="/adminlogs" element={<Adminlogs />} />
        <Route path="/chatbot" element={<Chatbot />} />


        <Route path="/awarenessteam" element={<Awareness />} />
        <Route path="/assessmentteam" element={<Assessment />} />
        <Route path="/JCCTteam" element={<JCCT />} />
        <Route path="/cyberhubteam" element={<CyberHub />} />


        <Route path="/" element={<Home />} />

        <Route path="/ctfhome" element={<CTFHome />} />
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
        <Route path="/dashboard" element={<Setting />} />
        <Route path="/notifications" element={<Notifications />} />

        <Route
          path="/learningPortalHome"
          element={<LearningPortalHomePage />}
        />
        <Route
          path="/learningPortalAssessments"
          element={<LearningPortalAssessments />}
        />
        <Route
          path="/learningPortalMaterials"
          element={<LearningPortalMaterials />}
        />
        <Route path="/learning/cybersecurity" element={<Introduction />} />
        <Route path="/learning/admin" element={<AdminPanel />} /> 


        <Route path="/schoollogin" element={<Schoollogin />} />
        <Route path="/schoolmain" element={<Schoolmain />} />
        <Route path="/school/createuser" element={<Schooladmin />} />
        <Route path="/schoolhome" element={<SchoolHome />} />


        <Route path="/ticTacToe" element={<TicTacToe />} />
      </Routes>
    </Router>
  );
}

export default App;
