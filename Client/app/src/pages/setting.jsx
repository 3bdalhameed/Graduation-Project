import React, { useState } from "react";
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

function UserDashboard() {
  // User State
  const [user, setUser] = useState({
    name: "3bdalhameed",
    email: "3bdalhameed@example.com",
    rank: "1st place",
    points: 3759,
    profilePicture: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newScore, setNewScore] = useState(3759);

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
    labels: [
      "01:45",
      "02:00",
      "02:15",
      "02:30",
      "02:45",
      "03:00",
      "03:15",
    ],
    datasets: [
      {
        label: "Score",
        data: [200, 400, 600, 800, 1000, 1200, newScore],
        borderColor: "#e74c3c",
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: { color: "#ffffff" },
        title: { display: true, text: "Time", color: "#ffffff" },
      },
      y: {
        ticks: { color: "#ffffff" },
        title: { display: true, text: "Score", color: "#ffffff" },
        beginAtZero: true,
      },
    },
  };

  // Handlers
  const handleEditProfile = () => setIsEditing(true);
  const handleSaveProfile = () => setIsEditing(false);
  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleProfilePictureChange = (e) => {
    setUser({ ...user, profilePicture: URL.createObjectURL(e.target.files[0]) });
  };

  const updateScore = () => {
    const randomScore = newScore + Math.floor(Math.random() * 500 + 100);
    setNewScore(randomScore);
    setUser({ ...user, points: randomScore });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md">
        <Navbar />
      </div>

      {/* Header */}
      <div className="bg-gray-200 dark:bg-gray-800 w-full py-6 text-center mt-16">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 mb-4">
            <img
              src={
                user.profilePicture ||
                "https://via.placeholder.com/150?text=Profile"
              }
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            <input
              type="file"
              onChange={handleProfilePictureChange}
              className="mt-2 text-sm text-gray-800 dark:text-gray-300"
            />
          </div>
          {isEditing ? (
            <div className="space-y-4 mt-4">
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-lg px-4 py-2 w-60"
              />
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-lg px-4 py-2 w-60"
              />
              <button
                onClick={handleSaveProfile}
                className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Save
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mt-6">{user.name}</h1>
              <p>{user.email}</p>
              <button
                onClick={handleEditProfile}
                className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mt-8">
        <p className="text-xl font-medium">{user.rank}</p>
        <p className="text-2xl font-bold text-green-400">{user.points} points</p>
        <button
          onClick={updateScore}
          className="bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600 mt-4"
        >
          Update Score
        </button>
      </div>

      {/* Charts */}
      <div className="flex flex-wrap justify-center mt-12 gap-8">
        {/* Key Percentages */}
        <div className="w-80 bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-center text-lg font-medium mb-4">
            Key Percentages
          </h3>
          <Pie data={keyPercentagesData} />
        </div>

        {/* Category Breakdown */}
        <div className="w-80 bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-center text-lg font-medium mb-4">
            Category Breakdown
          </h3>
          <Pie data={categoryBreakdownData} />
        </div>
      </div>

      {/* Score Over Time */}
      <div className="w-4/5 bg-gray-200 dark:bg-gray-800 p-6 mt-12 rounded-lg shadow-md mx-auto">
        <h3 className="text-center text-lg font-medium mb-4">
          Score over Time
        </h3>
        <Line data={scoreOverTimeData} options={lineChartOptions} />
      </div>
    </div>
  );
}

export default UserDashboard;
