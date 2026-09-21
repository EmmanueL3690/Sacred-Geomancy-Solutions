import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

export default function LoginForm({ onLogin }) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    setLoading(true);

    try {
      // 1. Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const message = error.message.toLowerCase();

        if (message.includes("email not confirmed")) {
          setErrorMsg(
            "Please check your inbox and verify your email before logging in."
          );
        } else if (
          message.includes("invalid login credentials") ||
          message.includes("invalid_credentials")
        ) {
          setErrorMsg("Invalid email address or password.");
        } else if (
          message.includes("failed to fetch") ||
          message.includes("networkerror")
        ) {
          setErrorMsg(
            "Network error. Please check your connection and try again."
          );
        } else {
          setErrorMsg(
            error.message || "An unexpected error occurred. Please try again."
          );
        }

        return;
      }

      // 2. Check that we have a logged-in user
      if (!data?.user) {
        throw new Error("User login failed. Please try again.");
      }

      // 3. Get user role from profiles table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        console.error("Profile error:", profileError);
        throw new Error(profileError.message);
      }

      // 4. Make sure a profile was found
      if (!profile) {
        throw new Error("Could not find your user profile.");
      }

      // 5. Notify parent after profile is confirmed
      if (typeof onLogin === "function") {
        onLogin(data.user);
      }

      // 6. Redirect based on role
      if (profile.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/app", { replace: true });
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      if (err.message === "Failed to fetch" || err.name === "TypeError") {
        setErrorMsg(
          "Network error. Please check your connection and try again."
        );
      } else {
        setErrorMsg(
          err.message || "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-white/10 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_0_25px_rgba(255,255,255,0.05)] w-full max-w-md mx-auto space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-400 to-purple-400 tracking-tight">
          Numbers to Solutions
        </h1>
        <p className="text-gray-300 text-sm">Enter your details to unlock guidance</p>
      </div>

      {/* Full Name */}
      <div>
        <input
          type="text"
          placeholder="Full Name (Optional)"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all"
        />
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all"
          required
        />
      </div>

      {/* Password with toggle */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Error Display */}
      {errorMsg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-red-400 text-sm bg-red-500/10 p-2.5 rounded-xl border border-red-500/20"
        >
          {errorMsg}
        </motion.div>
      )}

      {/* Login Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-purple-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center"
      >
        {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : "Login"}
      </button>

      {/* Navigation Links */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-300 gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="text-cyan-300 hover:text-purple-300 transition"
        >
          Don’t have an account? Sign up
        </button>
      
      </div>
    </motion.form>
  );
}