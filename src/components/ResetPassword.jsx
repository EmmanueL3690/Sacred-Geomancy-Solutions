// "use client";

// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// export default function ResetPassword() {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { token } = useParams(); // token from reset link
//   const navigate = useNavigate();

//   const handleReset = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     setMessage("");

//     // ✅ Validation
//     if (!newPassword || !confirmPassword) {
//       setErrorMsg("Please fill in both password fields.");
//       return;
//     }

//     if (newPassword.length < 6) {
//       setErrorMsg("Password must be at least 6 characters long.");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setErrorMsg("Passwords do not match.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch(
//         `https://auth-backend-1qly.onrender.com/api/auth/reset-password/${token}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ password: newPassword }),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Failed to reset password");

//       setMessage("✅ Password reset successful! Redirecting to login...");
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (err) {
//       setErrorMsg("⚠️ " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-indigo-900 p-4">
//       <form
//         onSubmit={handleReset}
//         className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
//       >
//         <h1 className="text-2xl sm:text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
//           Reset Password
//         </h1>

//         <input
//           type="password"
//           placeholder="New Password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Confirm New Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
//           required
//         />

//         {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
//         {message && <p className="text-green-400 text-sm">{message}</p>}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 bg-gradient-to-r from-pink-400 to-red-500 hover:from-red-500 hover:to-pink-400 text-white font-bold rounded-lg disabled:opacity-50 transition-all"
//         >
//           {loading ? "Resetting..." : "Reset Password"}
//         </button>
//       </form>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🧠 Supabase listens for the reset session when user lands via email link
  useEffect(() => {
    const handleRecovery = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        setErrorMsg("⚠️ Invalid or expired reset link.");
      }
    };
    handleRecovery();
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setMessage("");

    if (!newPassword || !confirmPassword)
      return setErrorMsg("Please fill in both fields.");

    if (newPassword !== confirmPassword)
      return setErrorMsg("Passwords do not match.");

    if (newPassword.length < 6)
      return setErrorMsg("Password must be at least 6 characters long.");

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setErrorMsg(error.message || "Failed to reset password.");
    } else {
      setMessage("✅ Password reset successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-indigo-900 p-4">
      <motion.form
        onSubmit={handleReset}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h1 className="text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
          Reset Password
        </h1>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 pr-10 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-300 cursor-pointer"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </span>
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 pr-10 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-300 cursor-pointer"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </span>
        </div>

        {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
        {message && <p className="text-green-400 text-sm">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-pink-400 to-red-500 hover:from-red-500 hover:to-pink-400 text-white font-bold rounded-lg disabled:opacity-50 transition-all flex items-center justify-center"
        >
          {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : "Reset Password"}
        </button>
      </motion.form>
    </div>
  );
}
