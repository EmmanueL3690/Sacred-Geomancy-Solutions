import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function ResetPassword({ onShowLogin }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("access_token"); // Supabase passes this in the reset link

  const handleReset = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!password || !confirmPassword) {
      setErrorMsg("Please fill in both fields.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMsg(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.updateUser({
        access_token: token,
        password,
      });
      if (error) throw error;

      setSuccessMsg("Password updated successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setErrorMsg(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleReset}
      className="max-w-md mx-auto mt-20 p-6 bg-white/10 backdrop-blur-xl rounded-xl space-y-4"
    >
      <h1 className="text-2xl font-bold text-center text-white">Reset Password</h1>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 rounded bg-white/20 text-white"
      />

      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full p-2 rounded bg-white/20 text-white"
      />

      {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
      {successMsg && <p className="text-green-400 text-sm">{successMsg}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-red-500 py-2 rounded text-white font-bold"
      >
        {loading ? "Updating..." : "Reset Password"}
      </button>

      <p className="text-center text-sm text-gray-200 mt-2">
        Remembered your password?{" "}
        <button onClick={onShowLogin} className="text-orange-400 hover:underline">
          Login
        </button>
      </p>
    </form>
  );
}
