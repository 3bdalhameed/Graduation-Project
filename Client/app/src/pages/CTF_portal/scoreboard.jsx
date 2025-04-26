import { useEffect, useState } from "react";
import useTokenStore from "../../stores/useTokenStore";
import { fetchUserScoreboard } from "../../api/users";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ScoreboardPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useTokenStore((state) => state.token);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUserScoreboard(token);
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load scoreboard. Please try again later.");
        setLoading(false);
      }
    };

    getUsers();
  }, [token]);

  const chartData = {
    labels: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6"], // Progress steps
    datasets: users.map((user) => ({
      label: user.name,
      data: user.progress,
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 1)`,
      backgroundColor: "transparent",
      tension: 0.3,
    })),
  };

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
        title: { display: true, text: "Users", color: "#ffffff" },
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
      <div className="py-16">
        <header className="bg-gray-800 py-6">
          <h1 className="text-4xl font-bold text-center text-white">User Scoreboard</h1>
        </header>

        <div className="md:container md:mx-auto">
          {loading ? (
            <p className="text-center text-white">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-6">Top Users</h2>
                <div className="w-4/5 h-3/5 mx-auto">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>

              <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                <table className="w-full table-auto">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Place</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Username</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id || index}>
                        <td className="px-6 py-4 text-sm font-medium text-white">{index + 1}</td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <Link
                            to={`/profile/${user.name}`}
                            className="text-blue-400 hover:text-blue-300 underline"
                          >
                            {user.name}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-white">{user.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreboardPage;
