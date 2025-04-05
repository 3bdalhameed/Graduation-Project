import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import NavBar from "../../components/Navbar_logon/navbar";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

function Scoreboard() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return navigate("/login");

      try {
        const response = await fetch("http://localhost:8000/api/validate-token/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) navigate("/login");
      } catch {
        navigate("/login");
      }
    };

    const fetchScores = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/scoreboard/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        });
        const data = await response.json();
        setPlayers(data);

        const labels = data[0]?.progress.map((_, idx) => `${idx + 1}:00`) || [];
        const datasets = data.map((player) => ({
          label: player.name,
          data: player.progress,
          borderColor: player.color || `hsl(${Math.random() * 360}, 70%, 50%)`,
          fill: false,
        }));

        setChartData({ labels, datasets });
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    validateToken();
    fetchScores();
  }, [navigate]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: { color: "#ffffff" },
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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 shadow-md">
        <NavBar />
      </div>

      <div className="py-16">
        <header className="bg-gray-800 py-6">
          <h1 className="text-4xl font-bold text-center text-white">Scoreboard</h1>
        </header>

        <div className="md:container md:mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-6">Top Teams</h2>
            <div className="w-4/5 h-3/5 mx-auto">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <table className="w-full table-auto">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Place</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Team</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Score</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr
                    key={player.name}
                    className={`${index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"} hover:bg-gray-700`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-white">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium text-blue-400">{player.name}</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">{player.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scoreboard;
