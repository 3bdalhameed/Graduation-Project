import React, { useState } from "react";

function CreateChallenge() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [creator, setCreator] = useState(""); // You might get this from a user session
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const token = localStorage.getItem("access_token"); // Assuming JWT token is stored in localStorage

    if (!token) {
      setError("You must be logged in to create a challenge.");
      return;
    }

    const requestData = { name, category, subcategory, difficulty, creator };

    try {
      const response = await fetch("http://localhost:8000/api/challenge/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send JWT token
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Challenge created successfully!");
        setName("");
        setCategory("");
        setSubcategory("");
        setDifficulty("");
        setCreator("");
      } else {
        setError(data.error || "Failed to create challenge.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Create a Challenge</h2>
      {message && <p className="bg-green-100 text-green-700 p-3 rounded">{message}</p>}
      {error && <p className="bg-red-100 text-red-700 p-3 rounded">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Challenge Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Subcategory"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <input
          type="text"
          placeholder="Creator Name"
          value={creator}
          onChange={(e) => setCreator(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Create Challenge
        </button>
      </form>
    </div>
  );
}

export default CreateChallenge;
