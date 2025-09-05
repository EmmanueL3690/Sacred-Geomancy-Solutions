import { useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMsg("");

    if (!email) {
      setErrorMsg("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
        const res = await fetch("https://auth-backend-blush.vercel.app/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
      } else {
        setMessage(data.message || "Password reset instructions sent.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error. Make sure the backend is running.");
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
          Forgot Password
        </h1>
        <p className="text-sm text-gray-200 text-center">
          Enter your email to receive password reset instructions
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-white/30 bg-white/20 text-white placeholder-gray-300 p-3 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {errorMsg && <p className="text-red-400 font-semibold text-sm">{errorMsg}</p>}
        {message && <p className="text-green-400 font-semibold text-sm">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-orange-400 to-red-500 hover:from-red-500 hover:to-orange-400 text-white font-bold rounded-lg disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="text-center text-sm text-gray-300">
          Remembered your password?{" "}
          <Link to="/login" className="text-orange-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;
