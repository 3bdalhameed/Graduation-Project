import React, { useState, useEffect } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import Navbar from "../components/Navbar_logon/navbar";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
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

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    // Fetch User Data
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/home/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setError("Failed to fetch user data.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("An error occurred while fetching user data.");
      }
    };

    // Fetch Team Data
    const fetchTeamData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/teams/check/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.in_team) {
            const teamResponse = await fetch(`http://localhost:8000/api/teams/${data.team_id}/`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });

            if (teamResponse.ok) {
              const teamDetails = await teamResponse.json();
              setTeamData(teamDetails);
            } else {
              setError("Failed to fetch team details.");
            }
          } else {
            setError("You are not part of any team.");
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

    // Fetch Solved Challenges
    const fetchSolvedChallenges = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/challenges/solved/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const challenges = await response.json();
          setSolvedChallenges(challenges);
        } else {
          setError("Failed to fetch solved challenges.");
        }
      } catch (err) {
        console.error("Error fetching solved challenges:", err);
        setError("An error occurred while fetching solved challenges.");
      }
    };

    fetchUserData();
    fetchTeamData();
    fetchSolvedChallenges();
  }, []);

  // Chart Data
  const userPerformanceData = {
    labels: ["Exploitation", "Networking", "Web"],
    datasets: [
      {
        label: "User Performance",
        data: [50, 33.3, 16.7],
        backgroundColor: ["#3498db", "#e67e22", "#2ecc71"],
      },
    ],
  };

  const teamRankingData = {
    labels: ["Team A", "Team B", "Team C", "Your Team"],
    datasets: [
      {
        label: "Total Points",
        data: [2500, 3000, 2800, teamData?.points || 0],
        backgroundColor: ["#f39c12", "#9b59b6", "#1abc9c", "#e74c3c"],
      },
    ],
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar Navigation */}
      <div className="w-1/4 h-screen bg-white dark:bg-gray-800 p-6 shadow-lg">
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
      <div className="ml-1/4 w-3/4 p-8">
        {activeTab === "team" ? (
          loading ? (
            <p className="text-gray-700 dark:text-gray-300">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
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
                  <h2 className="text-lg font-semibold">Recent Challenges</h2>
                  <ul>
                    {teamData.recent_challenges?.map((challenge) => (
                      <li key={challenge.id} className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg my-1">
                        {challenge.name} - {challenge.status}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Team Ranking</h3>
                <Bar data={teamRankingData} />
              </div>
            </div>
          )
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{user?.username}</h1>
            <p><strong>Email:</strong> {user?.email}</p>
            <p className="text-2xl font-bold text-green-400">{user?.points} points</p>

            <div className="mt-6">
              <h2 className="text-xl font-semibold">Solved Challenges</h2>
              <ul className="mt-4">
                {solvedChallenges.map((challenge) => (
                  <li key={challenge.id} className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg my-1">
                    {challenge.name} - {challenge.category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamAndUserDashboard;
