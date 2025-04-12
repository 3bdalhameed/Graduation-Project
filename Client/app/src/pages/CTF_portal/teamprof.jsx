import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTokenStore from "../../stores/useTokenStore";

function TeamProfile() {
  const { teamId } = useParams();
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = useTokenStore((state) => state.token);

  useEffect(() => {
    // Fetch team data
    const fetchTeamDetails = async () => {
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
            // Fetch full team details using the team ID
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
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-700 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-24">
      
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
          {teamData.name}
        </h1>
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
          {/* Team Info */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Team Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              <strong>Team Code:</strong> {teamData.code}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              <strong>Points:</strong> {teamData.points}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              <strong>Rank:</strong> {teamData.rank}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Created By:</strong> {teamData.created_by.username}
            </p>
          </div>

          {/* Team Members */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Members
            </h2>
            
            <ul className="space-y-2">
              {teamData.members.map((member) => (
                <li
                  key={member.id}
                  className="flex items-center justify-between bg-gray-200 dark:bg-gray-700 p-3 rounded-lg"
                >
                  <p className="text-gray-800 dark:text-gray-200">
                    {member.username}
                  </p>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {member.email}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default TeamProfile;
