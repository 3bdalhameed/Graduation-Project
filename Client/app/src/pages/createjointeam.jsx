import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar_logon/navbar";
import {  useNavigate } from "react-router-dom";

function CreateOrJoinTeam() {
    const [teamName, setTeamName] = useState("");
    const [teamCode, setTeamCode] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [action, setAction] = useState("create"); // 'create' or 'join'
    const navigate = useNavigate();

    useEffect(() => {
        const checkTeamStatus = async () => {
          const token = localStorage.getItem("access_token"); // Assuming token is stored in localStorage
          const response = await fetch("http://localhost:8000/api/teams/check/", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          const data = await response.json();
          if (data.in_team) {
            navigate('/teamprofile'); // Redirect to the team dashboard
          }
        };
    
        checkTeamStatus();
      }, [navigate]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
      
        // Validation for create and join actions
        if (action === "create" && !teamName) {
          setError("Please provide a team name.");
          return;
        }
      
        if (action === "join" && !teamCode) {
          setError("Please provide a team code.");
          return;
        }
      
        try {
          const token = localStorage.getItem("access_token");
          const endpoint =
            action === "create"
              ? "http://localhost:8000/api/teams/create/"
              : "http://localhost:8000/api/teams/join/";
      
          const body =
            action === "create"
              ? { team_name: teamName } // Match backend field
              : { team_code: teamCode }; // Match backend field
      
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
          });
      
          const data = await response.json();
      
          if (response.ok) {
            setSuccess(data.message || "Action successful!");
            setTeamName("");
            setTeamCode("");
            navigate("/teamprofile/"); // Adjust as necessary
          } else {
            setError(data.error || "An error occurred. Please try again.");
          }
        } catch (err) {
          console.error(err);
          setError("An error occurred. Please try again.");
        }
      };
      
      

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-md">
        <Navbar />
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {action === "create" ? "Create a Team" : "Join a Team"}
          </h1>
          {error && (
            <p className="bg-red-500 text-white p-3 rounded mb-4">{error}</p>
          )}
          {success && (
            <p className="bg-green-500 text-white p-3 rounded mb-4">
              {success}
            </p>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {action === "create" && (
              <div>
                <label
                  htmlFor="teamName"
                  className="block text-gray-300 font-medium mb-2"
                >
                  Team Name
                </label>
                <input
                  type="text"
                  id="teamName"
                  placeholder="Enter team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}
            {action === "join" && (
              <div>
                <label
                  htmlFor="teamCode"
                  className="block text-gray-300 font-medium mb-2"
                >
                  Team Code
                </label>
                <input
                  type="text"
                  id="teamCode"
                  placeholder="Enter team code"
                  value={teamCode}
                  onChange={(e) => setTeamCode(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {action === "create" ? "Create Team" : "Join Team"}
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-gray-400">
              {action === "create" ? "Want to join instead?" : "Want to create instead?"}{" "}
              <button
                onClick={() => setAction(action === "create" ? "join" : "create")}
                className="text-blue-400 hover:underline focus:outline-none"
              >
                Click here
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateOrJoinTeam;
