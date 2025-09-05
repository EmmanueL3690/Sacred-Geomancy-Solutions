import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

function ResetPassword() {
  const { token } = useParams(); // get token from URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMsg("");

    if (!newPassword || !confirmPassword) {
      setErrorMsg("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Failed to reset password.");
      } else {
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login"); // redirect after 2 seconds
        }, 2000);
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl max-w-md w-full space-y-6 z-30"
      >
        <h1 className="text-2xl font-bold text-white text-center">Reset Password</h1>
        <p className="text-gray-300 text-sm text-center">Enter your new password</p>

        <input
          type="password"
          placeholder="New Password"
          className="w-full border border-white/30 bg-white/20 text-white placeholder-gray-300 p-3 rounded-lg"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full border border-white/30 bg-white/20 text-white placeholder-gray-300 p-3 rounded-lg"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
        {message && <p className="text-green-400 text-sm">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-orange-400 to-red-500 hover:from-red-500 hover:to-orange-400 text-white font-bold rounded-lg disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
