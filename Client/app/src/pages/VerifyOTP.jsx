import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOTP } from "../api/users";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, username, password } = location.state || {};
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !username || !password) {
      setError("Missing user details. Please try signing up again.");
      setLoading(false);
      return;
    }

    try {
      // Use the API function to verify OTP
      await verifyOTP({ email, otp, username, password });
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>
        <p className="text-center text-gray-600 mb-4">Enter the OTP sent to {email}</p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded mt-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-4"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
