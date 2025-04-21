import React, { useEffect, useState } from "react";
import { fetchTeams } from "../../api/teams";
import { Link } from "react-router-dom";


function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch teams from the backend using API function
    const getTeams = async () => {
      try {
        const data = await fetchTeams();
        setTeams(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getTeams();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="pt-20 px-4 md:px-8">
        <h1 className="text-4xl font-bold text-center my-6 py-9">Registered Teams</h1>

        {loading && <p className="text-center text-gray-400">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <table className="w-full table-auto">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-300">Team Name</th>
                  <th className="px-6 py-4 text-left text-gray-300">Created Date</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                    } hover:bg-gray-700`}
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={`/teams/${team.id}`}
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        {team.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(team.created_date).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {teams.length === 0 && (
                  <tr>
                    <td colSpan="2" className="text-center py-4">
                      No teams found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamsPage;
