import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to JUCC Learning Portal</h1>
      <p className="text-lg text-gray-300 mb-8">Choose how you want to proceed:</p>
      
      <div className="flex gap-6">
        <button
          onClick={() => navigate("/learningPortalMaterials")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg transition"
        >
          Learning Materials
        </button>
        <button
          onClick={() => navigate("/learningPortalAssessments")}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg transition"
        >
          Take Assessments
        </button>
      </div>
    </div>
  );
}
