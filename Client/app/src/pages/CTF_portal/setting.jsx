import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import Navbar from "../../components/Navbar_logon/navbar.jsx";
import axios from "axios";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function TeamAndUserDashboard() {
  const [user, setUser] = useState(null);
  const [teamData, setTeamData] = useState(null);
  const [solvedChallenges, setSolvedChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("user");

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
          setTeamData(response.data);
        }
      } catch (err) {
        console.error("Error fetching team data:", err);
      }
    };

    const fetchSolvedChallenges = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/solved-challenges/", {
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
    setLoading(false);
  }, []);

  // Aggregate data by category
  const categoryData = solvedChallenges.reduce((acc, challenge) => {
    acc[challenge.category] = (acc[challenge.category] || 0) + challenge.points;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: "Points Earned by Category",
        data: Object.values(categoryData),
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0", "#9966FF"],
      },
    ],
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
              activeTab === "user"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("user")}
          >
            User Dashboard
          </li>
          <li
            className={`p-3 cursor-pointer rounded-lg ${
              activeTab === "team"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("team")}
          >
            Team Dashboard
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 pt-24">
        {activeTab === "user" ? (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Solved Challenges by Category
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <ul>
                  {solvedChallenges.length > 0 ? (
                    solvedChallenges.map((challenge) => (
                      <li
                        key={challenge.id}
                        className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg my-2 shadow"
                      >
                        <strong>{challenge.title}</strong> - {challenge.category} ({challenge.points} pts)
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center">
                      No solved challenges yet.
                    </p>
                  )}
                </ul>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                {Object.keys(categoryData).length > 0 ? (
                  <Pie data={pieChartData} className="max-w-xs" />
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    No data to display.
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Team Dashboard
            </h2>
            {teamData ? (
              <div>
                <p><strong>Team Name:</strong> {teamData.name}</p>
                <p><strong>Total Points:</strong> {teamData.points}</p>
                <p><strong>Team Code:</strong> {teamData.password}</p>
                <h3 className="text-lg font-semibold mt-4">Members</h3>
                <ul>
                  {teamData?.members && teamData.members.length > 0 ? (
                    teamData.members.map((member) => (
                      <li key={member.id} className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg my-1">
                        {member.username} - {member.email}
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center">
                      No team members available.
                    </p>
                  )}
                </ul>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center">
                No team data available.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamAndUserDashboard;
