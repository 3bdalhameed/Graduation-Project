import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const SchoolSignup = () => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({ name: "", password: "", role: "student" });
  const [loading, setLoading] = useState(false);  // <-- loading state
  const BACKEND_URL = 'http://localhost:8000';

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/school/send-otp/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("OTP sent to your email 📩");
        setStep("otp");
      } else {
        toast.error(data.error || "Error sending OTP");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/school/verify-otp/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("OTP verified ✅");
        setStep("form");
      } else {
        toast.error(data.error || "Error verifying OTP");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/school/signup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Account created successfully 🎉 Redirecting...");
        setTimeout(() => {
          window.location.href = '/schoollogin';
        }, 1500);
      } else {
        toast.error(data.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg space-y-6">

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          </div>
        ) : (
          <>
            {step === "email" && (
              <>
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Enter your Email</h2>
                <input
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  type="email"
                />
                <button
                  onClick={handleSendOTP}
                  className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition mt-4"
                >
                  Send OTP
                </button>
              </>
            )}

            {step === "otp" && (
              <>
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Verify OTP</h2>
                <input
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />
                <button
                  onClick={handleVerifyOTP}
                  className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition mt-4"
                >
                  Verify OTP
                </button>
              </>
            )}

            {step === "form" && (
              <>
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Complete Signup</h2>
                <input
                  className="w-full mb-3 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Name"
                />
                <input
                  className="w-full mb-3 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.password}
                  type="password"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Password"
                />
                <select
                  className="w-full mb-3 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
                <button
                  onClick={handleSignup}
                  className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Create Account
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SchoolSignup;
