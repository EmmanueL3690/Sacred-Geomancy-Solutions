import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, User, Mail, Lock } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

export default function SignupForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("⚠️ Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // 🔹 Create user account via Supabase with metadata matching the DB trigger key
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullname,
          },
        },
      });

      if (error) throw error;

      // Check if email confirmation is required by Supabase
      if (data?.user && data?.session === null) {
        setSuccessMsg("✅ Account created! Please check your email to confirm, then log in.");
      } else {
        setSuccessMsg("✅ Account created successfully! Redirecting to login...");
      }

      // 🔹 Redirect directly to the login page
      setTimeout(() => {
        navigate("/login");
      }, 2500);

    } catch (err) {
      console.error("Signup error:", err);
      setErrorMsg(err.message || "Unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSignup}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-white/10 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-3xl 
      shadow-[0_0_25px_rgba(255,255,255,0.05)] w-full max-w-md mx-auto space-y-6"
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent 
        bg-gradient-to-r from-cyan-300 via-green-400 to-purple-400 tracking-tight">
          Create Account
        </h1>
        <p className="text-gray-300 text-sm">
          Register to access your personal dashboard
        </p>
      </div>

      {/* Full Name */}
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full p-3 pl-10 rounded-xl bg-white/10 text-white placeholder-gray-400 
          border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all"
          required
        />
      </div>

      {/* Email */}
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 pl-10 rounded-xl bg-white/10 text-white placeholder-gray-400 
          border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all"
          required
        />
      </div>

      {/* Password */}
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 pl-10 rounded-xl bg-white/10 text-white placeholder-gray-400 
          border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all"
          required
        />
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 pl-10 rounded-xl bg-white/10 text-white placeholder-gray-400 
          border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all"
          required
        />
      </div>

      {/* Error & Success Messages */}
      {errorMsg && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-center text-sm">
          {errorMsg}
        </motion.p>
      )}
      {successMsg && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-center text-sm font-medium">
          {successMsg}
        </motion.p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-400 to-purple-500 
        hover:from-purple-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/20 transition-all 
        disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center"
      >
        {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : "Sign Up"}
      </button>

      {/* Login link */}
      <div className="flex justify-center text-sm text-gray-300 mt-2">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-cyan-300 hover:text-purple-300 transition"
        >
          Already have an account? Log in
        </button>
      </div>
    </motion.form>
  );
}