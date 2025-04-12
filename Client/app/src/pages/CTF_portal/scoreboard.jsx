import React, { useEffect, useState } from "react";
import { FaTrophy, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import useTokenStore from "../../stores/useTokenStore";

const ScoreboardPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userTeam, setUserTeam] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const token = useTokenStore((state) => state.token);

  useEffect(() => {
    // Fetch teams for the scoreboard
    const fetchTeams = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/teams/scoreboard/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch teams");
        }
        
        const data = await response.json();
        setTeams(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching teams:", error);
        setError("Failed to load scoreboard. Please try again later.");
        setLoading(false);
      }
    };

    // Fetch user's team
    const fetchUserTeam = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/teams/check/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserTeam(data);
        }
      } catch (error) {
        console.error("Error fetching user team:", error);
      }
    };

    fetchTeams();
    fetchUserTeam();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 shadow-md">
      </div>

      <div className="py-16">
        <header className="bg-gray-800 py-6">
          <h1 className="text-4xl font-bold text-center text-white">Scoreboard</h1>
        </header>

        <div className="md:container md:mx-auto">
          {loading ? (
            <p className="text-center text-white">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-6">Top Teams</h2>
                <div className="w-4/5 h-3/5 mx-auto">
                  {/* Add chart or other visualization here */}
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
                    {teams.map((team, index) => (
                      <tr
                        key={team.name}
                        className={`${index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"} hover:bg-gray-700`}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-white">{index + 1}</td>
                        <td className="px-6 py-4 text-sm font-medium text-blue-400">{team.name}</td>
                        <td className="px-6 py-4 text-sm font-medium text-white">{team.points}</td>
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
