// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { api } from "../api";
// import { Loader2 } from "lucide-react";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleReset = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setErrorMsg("");
//     setLoading(true);

//     try {
//       const data = await api.forgotPassword(email);
//       if (data.status === "success") {
//         setMessage("✅ Reset link sent! Check your email.");
//       } else {
//         setErrorMsg(data.message || "Failed to send reset email.");
//       }
//     } catch {
//       setErrorMsg("⚠️ Server error. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
//       {/* 🔮 Animated Gradient Background */}
//       <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0b0c10] via-[#1F4068] to-[#2C003E] animate-gradient">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.05),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.08),transparent_50%)]" />
//       </div>

//       {/* 🌟 Floating Particles (Optional aesthetic enhancement) */}
//       <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] bg-[length:3px_3px] opacity-20" />

//       {/* 🪄 Forgot Password Form */}
//       <motion.form
//         onSubmit={handleReset}
//         initial={{ opacity: 0, y: 30, scale: 0.95 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 text-white z-10"
//       >
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500"
//         >
//           Forgot Password
//         </motion.h1>

//         <p className="text-center text-sm text-gray-200">
//           Enter your email to receive a reset link
//         </p>

//         <motion.input
//           whileFocus={{ scale: 1.02 }}
//           type="email"
//           placeholder="Enter your email address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all"
//           required
//         />

//         {errorMsg && (
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-red-400 text-sm text-center"
//           >
//             {errorMsg}
//           </motion.p>
//         )}

//         {message && (
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-green-400 text-sm text-center"
//           >
//             {message}
//           </motion.p>
//         )}

//         <motion.button
//           whileTap={{ scale: 0.97 }}
//           whileHover={{ scale: 1.03 }}
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-purple-500 hover:to-indigo-400 text-white font-bold rounded-lg disabled:opacity-50 transition-all shadow-md"
//         >
//           {loading ? "Sending..." : "Send Reset Link"}
//         </motion.button>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           className="text-sm text-center text-gray-300"
//         >
//           Remembered your password?{" "}
//           <button
//             type="button"
//             onClick={() => navigate("/login")}
//             className="text-green-300 hover:text-green-400 underline transition"
//           >
//             Back to Login
//           </button>
//         </motion.p>
//       </motion.form>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { Loader2 } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMsg("");

    // Simple client-side email check
    if (!/\S+@\S+\.\S+/.test(email)) {
      return setErrorMsg("⚠️ Please enter a valid email address.");
    }

    setLoading(true);

    try {
      // ✅ Supabase password reset email
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://www.geomancysolutions.com/reset-password",
      });

      if (error) throw error;
      setMessage("✅ Password reset link sent! Please check your inbox.");
    } catch (error) {
      setErrorMsg(error.message || "⚠️ Failed to send reset email. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0b0c10] via-[#1F4068] to-[#2C003E] animate-gradient">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.05),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.08),transparent_50%)]" />
      </div>

      {/* Reset Form */}
      <motion.form
        onSubmit={handleReset}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 text-white z-10"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500">
          Forgot Password
        </h1>

        <p className="text-center text-sm text-gray-200">
          Enter your email to receive a reset link.
        </p>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 
                     focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all"
          required
        />

        {/* Status Messages */}
        {errorMsg && (
          <p className="text-red-400 text-sm text-center">{errorMsg}</p>
        )}
        {message && (
          <p className="text-green-400 text-sm text-center">{message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-indigo-400 to-purple-500 
                     hover:from-purple-500 hover:to-indigo-400 text-white font-bold rounded-lg 
                     disabled:opacity-50 transition-all shadow-md flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} /> Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </button>

        {/* Navigation */}
        <p className="text-sm text-center text-gray-300">
          Remembered your password?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-green-300 hover:text-green-400 underline transition"
          >
            Back to Login
          </button>
        </p>
      </motion.form>
    </div>
  );
}
