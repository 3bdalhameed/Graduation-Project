import React from "react";
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
import NavBar from "../components/Navbar_logon/navbar";

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

function Scoreboard() {
  const players = [
    { rank: 1, name: "3bdalhameed", points: 3759 },
    { rank: 2, name: "Omar", points: 3710 },
    { rank: 3, name: "kira22", points: 3313 },
    { rank: 4, name: "aws", points: 3150 },
    { rank: 5, name: "wiss", points: 3097 },
  ];

  // Chart data
  const chartData = {
    labels: ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00"],
    datasets: [
      {
        label: "3bdalhameed",
        data: [500, 1000, 1500, 2000, 2500, 3000, 3759],
        borderColor: "#FFD700", // Gold
        fill: false,
      },
      {
        label: "Omar",
        data: [400, 900, 1400, 1900, 2500, 3100, 3710],
        borderColor: "#1E90FF", // Dodger Blue
        fill: false,
      },
      {
        label: "kira22",
        data: [450, 950, 1250, 1700, 2200, 2800, 3313],
        borderColor: "#32CD32", // Lime Green
        fill: false,
      },
      {
        label: "aws",
        data: [300, 800, 1100, 1600, 2100, 2700, 3150],
        borderColor: "#FF69B4", // Hot Pink
        fill: false,
      },
      {
        label: "wiss",
        data: [200, 700, 1050, 1550, 2050, 2650, 3097],
        borderColor: "#8A2BE2", // Blue Violet
        fill: false,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#ffffff", // White legend text
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff", // White x-axis text
        },
        title: {
          display: true,
          text: "Time",
          color: "#ffffff", // White x-axis title
        },
      },
      y: {
        ticks: {
          color: "#ffffff", // White y-axis text
        },
        title: {
          display: true,
          text: "Score",
          color: "#ffffff", // White y-axis title
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 shadow-md">
        <NavBar />
      </div>

      {/* Main Content */}
      <div className="py-16"> {/* Add padding to compensate for the fixed navbar */}
        {/* Header */}
        <header className="bg-gray-800 py-6">
          <h1 className="text-4xl font-bold text-center text-white">
            Scoreboard
          </h1>
        </header>

        <div className="md:container md:mx-auto">
          {/* Chart */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-6">
              Top 10 Teams
            </h2>
            <div className="w-4/5 h-3/5 mx-auto">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Table */}
          <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <table className="w-full table-auto">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                    Place
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                    Team
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                    } hover:bg-gray-700`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {player.rank}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-blue-400">
                      {player.name}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {player.points}
                    </td>
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
