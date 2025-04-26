import React, { useEffect, useState } from "react";
import useTokenStore from "../stores/useTokenStore";
import { fetchSolvedAssessments } from "../api/assessments"; // Create this function

export default function SolvedAssessmentsAdmin() {
  const [solvedLogs, setSolvedLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useTokenStore((state) => state.token);

  useEffect(() => {
    if (!token) return;
    fetchSolvedAssessments(token)
      .then((data) => {
        setSolvedLogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch solved assessments:", err);
        setError("Failed to load solved assessments.");
        setLoading(false);
      });
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-24 px-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Solved Assessments Logs</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && solvedLogs.length === 0 && (
        <p className="text-center text-gray-400">No solved assessments found.</p>
      )}

      {!loading && !error && solvedLogs.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg shadow-md">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Username</th>
                <th className="py-3 px-6 text-left">Assessment Name</th>
                <th className="py-3 px-6 text-left">Score</th>
                <th className="py-3 px-6 text-left">Total Questions</th>
                <th className="py-3 px-6 text-left">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {solvedLogs.map((log, index) => (
                <tr
                  key={log.id}
                  className={`${index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"} hover:bg-gray-700`}
                >
                  <td className="py-3 px-6">{log.username}</td>
                  <td className="py-3 px-6">{log.assessment}</td>
                  <td className="py-3 px-6">{log.score}</td>
                  <td className="py-3 px-6">{log.total_questions}</td>
                  <td className="py-3 px-6">{new Date(log.submitted_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
