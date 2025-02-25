import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { email, username, password } = location.state || {}; // Get data from signup page

  const handleVerifyOTP = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8000/api/verify-signup-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password, otp }),
      });

      if (response.ok) {
        setSuccess("Verification successful! You can now log in.");
        setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2s
      } else {
        const errorData = await response.json();
        setError(errorData.error || "OTP verification failed. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Pleaase try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>
        <p className="text-center text-gray-600 mb-4">Enter the OTP sent to {email}</p>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleVerifyOTP}>
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
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOTP;
