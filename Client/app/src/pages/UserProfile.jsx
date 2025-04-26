import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [solvedChallenges, setSolvedChallenges] = useState([]);
  const [solvedAssessments, setSolvedAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user profile
  useEffect(() => {
    fetch(`http://localhost:8000/api/profile/${username}/`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  // Fetch solved challenges
  useEffect(() => {
    fetch(`http://localhost:8000/api/solved-challenges/${username}/`)
      .then((res) => res.json())
      .then((data) => setSolvedChallenges(data))
      .catch((err) => console.error("Error fetching solved challenges:", err));
  }, [username]);

  // Fetch solved assessments
  useEffect(() => {
    fetch(`http://localhost:8000/api/solved-assessments/${username}/`)
      .then((res) => res.json())
      .then((data) => setSolvedAssessments(data))
      .catch((err) => console.error("Error fetching solved assessments:", err));
  }, [username]);

  // Prepare chart data for challenges
  const categoryData = Array.isArray(solvedChallenges)
    ? solvedChallenges.reduce((acc, challenge) => {
        acc[challenge.category] = (acc[challenge.category] || 0) + challenge.points;
        return acc;
      }, {})
    : {};

  const pieChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: "Points by Category",
        data: Object.values(categoryData),
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  if (loading) {
    return <p className="text-center text-white mt-20">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="pt-24 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Profile: {user.username}</h1>
        <p className="text-lg mb-2">Email: {user.email}</p>
        <p className="text-lg mb-8">Date Joined: {new Date(user.date_joined).toLocaleString()}</p>

        {/* 🚀 Challenge Statistics Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
          <h2 className="text-2xl font-bold mb-4">🚀 Challenge Statistics</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <ul>
                {solvedChallenges.length > 0 ? (
                  solvedChallenges.map((challenge) => (
                    <li
                      key={challenge.id}
                      className="bg-gray-700 p-3 rounded-lg my-2 shadow"
                    >
                      <strong>{challenge.title}</strong> - {challenge.category} ({challenge.points} pts)
                    </li>
                  ))
                ) : (
                  <p className="text-gray-400 text-center">No solved challenges yet.</p>
                )}
              </ul>
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center">
              {Object.keys(categoryData).length > 0 ? (
                <Pie data={pieChartData} className="max-w-xs" />
              ) : (
                <p className="text-gray-400 text-center">No data to display.</p>
              )}
            </div>
          </div>
        </div>

        {/* 📋 Solved Assessments Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">📋 Solved Assessments</h2>
          {solvedAssessments.length === 0 ? (
            <p className="text-gray-400 text-center">No solved assessments found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-700 rounded-lg">
                <thead className="bg-gray-600 text-white">
                  <tr>
                    <th className="py-3 px-6 text-left">Assessment Name</th>
                    <th className="py-3 px-6 text-left">Score</th>
                    <th className="py-3 px-6 text-left">Total Questions</th>
                    <th className="py-3 px-6 text-left">Submitted At</th>
                  </tr>
                </thead>
                <tbody>
                  {solvedAssessments.map((log, index) => (
                    <tr
                      key={log.id || index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                      } hover:bg-gray-700`}
                    >
                      <td className="py-3 px-6">{log.assessment}</td>
                      <td className="py-3 px-6">{log.score}</td>
                      <td className="py-3 px-6">{log.total_questions}</td>
                      <td className="py-3 px-6">{log.submitted_at ? new Date(log.submitted_at).toLocaleString() : "No date"}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
