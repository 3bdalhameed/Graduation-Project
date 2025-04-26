import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import useTokenStore from "../../stores/useTokenStore";
import { fetchUserSolvedChallenges, fetchUserProfile } from "../../api/users";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function TeamAndUserDashboard() {
  const [user, setUser] = useState(null);
  const [teamData, setTeamData] = useState(null);
  const [solvedChallenges, setSolvedChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("user");
  const token = useTokenStore((state) => state.token);

  useEffect(() => {
    if (!token) return;
  
    // Fetch user profile (only once!)
    fetchUserProfile(token)
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user profile:", err));
  
    // Fetch solved challenges
    fetchUserSolvedChallenges(token)
      .then((data) => setSolvedChallenges(data))
      .catch((err) => console.error("Error fetching solved challenges:", err));
  
    setLoading(false);
  }, [token]);
  

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
        {/* Main Content */}
        <div className="flex-1 p-8 pt-24">
          {/* User Profile Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              👤 User Profile
            </h2>
            {user ? (
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p>
                  <strong>Role:</strong>{" "}
                  {user.is_staff ? (
                    <span className="text-green-500 font-semibold">Admin</span>
                  ) : (
                    <span className="text-blue-500 font-semibold">competitor</span>
                  )}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Loading user profile...</p>
            )}
          </div>
    
          {/* Solved Challenges Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Challenges Statistics
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
              <div className="w-full md:w-3/6 flex justify-center">
                {Object.keys(categoryData).length > 0 ? (
                  <Pie data={pieChartData} className="max-w-xs max-h-96" />
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    No data to display.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default TeamAndUserDashboard;
