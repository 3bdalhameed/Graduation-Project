import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTokenStore from "../../stores/useTokenStore";
import { createTeam, joinTeam } from "../../api/teams";

const CreateJoinTeamPage = () => {
  const navigate = useNavigate();
  const token = useTokenStore((state) => state.token);
  const [activeTab, setActiveTab] = useState("create");
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMessage("");

    try {
      await createTeam(teamName, token);
      setMessage("Team created successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  const handleJoinTeam = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMessage("");

    try {
      await joinTeam(teamCode, token);
      setMessage("Successfully joined the team!");
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-md">
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {activeTab === "create" ? "Create a Team" : "Join a Team"}
          </h1>
          {errorMessage && (
            <p className="bg-red-500 text-white p-3 rounded mb-4">
              {errorMessage}
            </p>
          )}
          {message && (
            <p className="bg-green-500 text-white p-3 rounded mb-4">
              {message}
            </p>
          )}
          <form
            className="space-y-6"
            onSubmit={activeTab === "create" ? handleCreateTeam : handleJoinTeam}
          >
            {activeTab === "create" && (
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
            {activeTab === "join" && (
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
              {activeTab === "create" ? "Create Team" : "Join Team"}
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-gray-400">
              {activeTab === "create"
                ? "Want to join instead?"
                : "Want to create instead?"}{" "}
              <button
                onClick={() =>
                  setActiveTab(activeTab === "create" ? "join" : "create")
                }
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
};

export default CreateJoinTeamPage;
