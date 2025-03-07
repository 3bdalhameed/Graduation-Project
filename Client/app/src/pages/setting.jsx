import React, { useState, useEffect } from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import Navbar from "../components/Navbar_logon/navbar.jsx";
import axios from "axios";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

function TeamAndUserDashboard() {
  const [teamData, setTeamData] = useState(null);
  const [user, setUser] = useState(null);
  const [solvedChallenges, setSolvedChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("team");
  const [teamCode, setTeamCode] = useState("");
  const [joinMessage, setJoinMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/home/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setUser(response.data);
        } else {
          setError("Failed to fetch user data.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("An error occurred while fetching user data.");
      }
    };

    const fetchTeamData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/teams/check/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          if (response.data.in_team) {
            const teamResponse = await axios.get(
              `http://localhost:8000/api/teams/${response.data.team_id}/`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            setTeamData(teamResponse.data);
          } else {
            setTeamData(null);
          }
        } else {
          setError("Failed to fetch user team status.");
        }
      } catch (err) {
        console.error("Error fetching team data:", err);
        setError("An error occurred while fetching team data.");
      } finally {
        setLoading(false);
      }
    };

    const fetchSolvedChallenges = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/solved_challenges/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setSolvedChallenges(response.data);
        }
      } catch (err) {
        console.error("Error fetching solved challenges:", err);
      }
    };

    fetchUserData();
    fetchTeamData();
    fetchSolvedChallenges();
  }, []);

  const handleJoinTeam = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/teams/join/",
        { code: teamCode },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setJoinMessage("Successfully joined the team!");
        setTimeout(() => {
          setJoinMessage("");
          window.location.reload(); // Reload to fetch the team data
        }, 1500);
      } else {
        setJoinMessage("Failed to join the team.");
      }
    } catch (err) {
      setJoinMessage("Invalid team code or an error occurred.");
      console.error("Error joining team:", err);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <Navbar />

      {/* Sidebar */}
      <div className="w-1/4 h-screen bg-white dark:bg-gray-800 p-6 shadow-lg pt-24">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Dashboard</h2>
        <ul>
          <li
            className={`p-3 cursor-pointer rounded-lg ${
              activeTab === "team"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("team")}
          >
            Team Profile
          </li>
          <li
            className={`p-3 cursor-pointer rounded-lg ${
              activeTab === "user"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("user")}
          >
            User Dashboard
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="ml-1/4 w-3/4 p-8 pt-24">
        {activeTab === "team" ? (
          loading ? (
            <p className="text-gray-700 dark:text-gray-300">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : teamData ? (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                {teamData.name}
              </h1>
              <div className="flex justify-between">
                <div>
                  <p><strong>Team Code:</strong> {teamData.code}</p>
                  <p><strong>Points:</strong> {teamData.points}</p>
                  <p><strong>Rank:</strong> {teamData.rank}</p>
                  <p><strong>Created By:</strong> {teamData.created_by.username}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Members</h2>
                  <ul>
                    {teamData.members.map((member) => (
                      <li key={member.id} className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg my-1">
                        {member.username} - {member.email}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                You are not in a team
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Enter a team code to join:</p>
              <input
                type="text"
                placeholder="Enter team code"
                value={teamCode}
                onChange={(e) => setTeamCode(e.target.value)}
                className="w-1/2 p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleJoinTeam}
                className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Join Team
              </button>
              {joinMessage && <p className="mt-4 text-green-500">{joinMessage}</p>}
            </div>
          )
        ) : (
          <div className="text-center text-white"> {/* User Dashboard */}</div>
        )}
      </div>
    </div>
  );
}

export default TeamAndUserDashboard;
