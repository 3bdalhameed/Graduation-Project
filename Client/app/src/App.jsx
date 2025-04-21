import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar.jsx";

import UserProfile from "./pages/UserProfile";
import TeamProfile from "./pages/TeamProfile.jsx";


// Services
import Awareness from "./pages/Services/Awareness.jsx";
import Assessment from "./pages/Services/Assessment.jsx";
import CyberHub from "./pages/Services/CyberHub.jsx";
import JNCSF from "./pages/Services/JNCSF.jsx";

// CTF Portal
import SignUp from "./pages/CTF_portal/signup.jsx";
import Home from "./pages/CTF_portal/Home.jsx";
import Login from "./pages/CTF_portal/login.jsx";
import Test from "./pages/test";
import Challenge from "./pages/CTF_portal/challenge.jsx";
import Createchallenge from "./pages/CTF_portal/createChallenge.jsx";
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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/profile/:username" element={<UserProfile />} />
        <Route path="/teams/:teamId" element={<TeamProfile />} />


        <Route path="/awarenessteam" element={<Awareness />} />
        <Route path="/assessmentteam" element={<Assessment />} />
        <Route path="/JNCSFteam" element={<JNCSF />} />
        <Route path="/cyberhubteam" element={<CyberHub />} />


        <Route path="/" element={<Home />} />
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

        <Route path="/ticTacToe" element={<TicTacToe />} />
      </Routes>
    </Router>
  );
}

export default App;
