import { useEffect, useState } from "react";
import useTokenStore from "../../stores/useTokenStore";
import { fetchScoreboard, checkUserTeam } from "../../api/teams";

const ScoreboardPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userTeam, setUserTeam] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const token = useTokenStore((state) => state.token);

  useEffect(() => {
    // Fetch teams for the scoreboard using API functions
    const getTeams = async () => {
      try {
        const data = await fetchScoreboard(token);
        setTeams(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching teams:", error);
        setError("Failed to load scoreboard. Please try again later.");
        setLoading(false);
      }
    };

    // Fetch user's team using API function
    const getUserTeam = async () => {
      try {
        const data = await checkUserTeam(token);
        if (data) {
          setUserTeam(data);
        }
      } catch (error) {
        console.error("Error fetching user team:", error);
      }
    };

    getTeams();
    getUserTeam();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 shadow-md"></div>

      <div className="py-16">
        <header className="bg-gray-800 py-6">
          <h1 className="text-4xl font-bold text-center text-white">
            Scoreboard
          </h1>
        </header>

        <div className="md:container md:mx-auto">
          {loading ? (
            <p className="text-center text-white">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-6">
                  Top Teams
                </h2>
                <div className="w-4/5 h-3/5 mx-auto">
                  {/* Add chart or other visualization here */}
                </div>
              </div>

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
                    {teams.map((team, index) => (
                      <tr
                        key={team.name}
                        className={`${
                          index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                        } hover:bg-gray-700`}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-white">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-blue-400">
                          {team.name}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-white">
                          {team.points}
                        </td>
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
