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
import Navbar from "../components/Navbar_logon/navbar";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("team"); // 'team' or 'user'

  // User State
  const [user, setUser] = useState({
    name: "3bdalhameed",
    rank: "1st place",
    points: 3759,
    profilePicture: null,
  });

  useEffect(() => {
    // Fetch team data
    const fetchTeamDetails = async () => {
      const token = localStorage.getItem("access_token");
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
            const teamResponse = await fetch(
              `http://localhost:8000/api/teams/${data.team_id}/`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (teamResponse.ok) {
              const teamData = await teamResponse.json();
              setTeamData(teamData);
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
        console.error("Error:", err);
        setError("An error occurred while fetching team data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDetails();
  }, []);

  // Chart Data
  const keyPercentagesData = {
    labels: ["Fails", "Solves"],
    datasets: [
      {
        data: [23.1, 76.9],
        backgroundColor: ["#e74c3c", "#27ae60"],
      },
    ],
  };

  const categoryBreakdownData = {
    labels: ["Exploitation", "Networking", "Web"],
    datasets: [
      {
        data: [50, 33.3, 16.7],
        backgroundColor: ["#3498db", "#e67e22", "#2ecc71"],
      },
    ],
  };

  const scoreOverTimeData = {
    labels: ["01:45", "02:00", "02:15", "02:30", "02:45", "03:00", "03:15"],
    datasets: [
      {
        label: "Score",
        data: [200, 400, 600, 800, 1000, 1200, user.points],
        borderColor: "#e74c3c",
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { ticks: { color: "#ffffff" }, title: { text: "Time", color: "#ffffff" } },
      y: { ticks: { color: "#ffffff" }, title: { text: "Score", color: "#ffffff" }, beginAtZero: true },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar Navigation */}
      <div className="flex">
        <div className=" w-1/4 bg-white dark:bg-gray-800 p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Dashboard</h2>
          <ul>
            <li
              className={`p-3 cursor-pointer rounded-lg ${activeTab === "team" ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
              onClick={() => setActiveTab("team")}
            >
              Team Profile
            </li>
            <li
              className={`p-3 cursor-pointer rounded-lg ${activeTab === "user" ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
              onClick={() => setActiveTab("user")}
            >
              User Dashboard
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="top-1/3 w-3/4 p-8">
          {activeTab === "team" ? (
            loading ? (
              <p className="text-gray-700 dark:text-gray-300">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="top-1/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">{teamData.name}</h1>
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
            )
          ) : (
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{user.name}</h1>
              <p>{user.rank}</p>
              <p className="text-2xl font-bold text-green-400">{user.points} points</p>

              {/* Charts */}
              <div className="flex flex-wrap justify-center mt-6 gap-6">
                <div className="w-72 bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium mb-4">Key Percentages</h3>
                  <Pie data={keyPercentagesData} />
                </div>

                <div className="w-72 bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium mb-4">Category Breakdown</h3>
                  <Pie data={categoryBreakdownData} />
                </div>
              </div>

              <div className="w-3/4 bg-gray-200 dark:bg-gray-800 p-6 mt-6 rounded-lg shadow-md mx-auto">
                <h3 className="text-lg font-medium mb-4">Score over Time</h3>
                <Line data={scoreOverTimeData} options={lineChartOptions} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamAndUserDashboard;
