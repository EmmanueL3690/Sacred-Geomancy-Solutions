import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

function ResetPassword() {
  const { token } = useParams();
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
        // 🔥 Show backend error (e.g., "Invalid or expired token.")
        setErrorMsg(data.error || "Failed to reset password.");
      } else {
        setMessage("✅ Password reset successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2500);
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/spiritual-realm.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/60 to-black/80"></div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl max-w-md w-full space-y-6 z-30"
      >
        <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 text-center">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border border-white/30 bg-white/20 text-white placeholder-gray-300 p-3 rounded-lg"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-white/30 bg-white/20 text-white placeholder-gray-300 p-3 rounded-lg"
        />

        {/* 🔥 Show backend messages */}
        {errorMsg && (
          <p className="text-red-400 font-semibold text-sm text-center">
            {errorMsg}
          </p>
        )}
        {message && (
          <p className="text-green-400 font-semibold text-sm text-center">
            {message}
          </p>
        )}

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
