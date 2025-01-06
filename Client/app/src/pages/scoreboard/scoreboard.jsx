import React from "react";

function Scoreboard() {
  const players = [
    { rank: 1, name: "Team Alpha", points: 4500 },
    { rank: 2, name: "Cyber Warriors", points: 4200 },
    { rank: 3, name: "Hack Masters", points: 4000 },
    { rank: 4, name: "Code Ninjas", points: 3900 },
    { rank: 5, name: "Script Kiddies", points: 3600 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Scoreboard
        </h1>
        {/* Scoreboard Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Team/Player
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {player.rank}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {player.name}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {player.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Scoreboard;
