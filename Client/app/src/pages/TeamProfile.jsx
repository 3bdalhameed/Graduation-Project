import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TeamProfile() {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/teams/${teamId}/`)
      .then((res) => res.json())
      .then((data) => {
        setTeam(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [teamId]);

  if (loading) return <p className="text-white text-center mt-20">Loading team profile...</p>;
  if (!team) return <p className="text-red-500 text-center mt-20">Team not found.</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 shadow-md">
      </div>
      <div className="pt-24 px-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Team: {team.name}</h1>
        <p className="text-lg mb-2">Created: {new Date(team.created_date).toLocaleString()}</p>
        <p className="text-lg mb-2">Members:</p>
        <ul className="list-disc ml-6">
          {team.members?.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TeamProfile;
