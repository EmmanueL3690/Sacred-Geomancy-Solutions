// "use client";

// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function VerifyEmail() {
//   const [code, setCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [resendLoading, setResendLoading] = useState(false);
//   const [countdown, setCountdown] = useState(0);

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get email from URL (e.g., /verify-email?email=user@example.com)
//   const queryParams = new URLSearchParams(location.search);
//   const email = queryParams.get("email");

//   // Countdown logic for resend button
//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [countdown]);

//   // Handle email verification
//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     setSuccessMsg("");

//     if (!email) {
//       setErrorMsg("Missing email. Please sign up again.");
//       return;
//     }

//     if (!code.trim()) {
//       setErrorMsg("Please enter your verification code.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("https://auth-backend-1qly.onrender.com/api/auth/verify-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, code }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setSuccessMsg("✅ Verification successful! Redirecting to login...");
//         setTimeout(() => navigate("/login"), 2000);
//       } else {
//         setErrorMsg(data.message || "Invalid or expired code.");
//       }
//     } catch (error) {
//       setErrorMsg("⚠️ Server error. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle resend verification code
//   const handleResend = async () => {
//     if (!email) {
//       setErrorMsg("Missing email. Please sign up again.");
//       return;
//     }

//     setResendLoading(true);
//     setErrorMsg("");
//     setSuccessMsg("");

//     try {
//       const res = await fetch("https://auth-backend-1qly.onrender.com/api/auth/resend-code", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setSuccessMsg("📩 Verification code resent successfully!");
//         setCountdown(60); // 60s cooldown before resending
//       } else {
//         setErrorMsg(data.message || "Unable to resend code.");
//       }
//     } catch (error) {
//       setErrorMsg("⚠️ Server error. Please try again later.");
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Background Video */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute top-0 left-0 w-full h-full object-cover -z-20"
//       >
//         <source src="/videos/aurora.mp4" type="video/mp4" />
//       </video>

//       {/* Dark overlay for better contrast */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-indigo-900/70 -z-10"></div>

//       {/* Logo and Back to Login */}
//       <div className="absolute top-6 left-6 flex items-center gap-3">
//         <img src="/logo23.jpg" alt="Logo" className="h-10 w-10 rounded-full shadow-lg" />
//         <button
//           onClick={() => navigate("/login")}
//           className="text-sm text-indigo-300 hover:text-pink-400 transition-all"
//         >
//           ← Back to Login
//         </button>
//       </div>

//       {/* Verification Form */}
//       <form
//         onSubmit={handleVerify}
//         className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md text-white space-y-6"
//       >
//         <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
//           Verify Your Email
//         </h1>

//         <p className="text-center text-sm">
//           A 6-digit code was sent to{" "}
//           <span className="font-semibold text-indigo-300">{email}</span>
//         </p>

//         <input
//           type="text"
//           placeholder="Enter verification code"
//           value={code}
//           onChange={(e) => setCode(e.target.value)}
//           maxLength={6}
//           className="w-full p-4 rounded-lg bg-white/20 text-center text-2xl tracking-widest font-bold border border-white/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400 transition-all"
//           required
//         />

//         {errorMsg && (
//           <p className="text-red-400 text-center text-sm animate-fade">{errorMsg}</p>
//         )}
//         {successMsg && (
//           <p className="text-green-400 text-center text-sm animate-fade">
//             {successMsg}
//           </p>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-bold rounded-lg disabled:opacity-50 transition-all"
//         >
//           {loading ? "Verifying..." : "Verify"}
//         </button>

//         {/* Resend Section */}
//         <div className="text-center mt-4 space-y-3">
//           <button
//             type="button"
//             onClick={handleResend}
//             disabled={resendLoading || countdown > 0}
//             className={`text-blue-300 hover:text-blue-400 text-sm font-medium transition-all ${
//               resendLoading || countdown > 0 ? "opacity-60 cursor-not-allowed" : ""
//             }`}
//           >
//             {countdown > 0
//               ? `⏳ Resend in ${countdown}s`
//               : resendLoading
//               ? "Sending..."
//               : "Resend Code"}
//           </button>

//           <button
//             type="button"
//             onClick={() => navigate("/signup")}
//             className="block mx-auto text-pink-400 hover:text-pink-300 text-sm"
//           >
//             Wrong email? Signup again
//           </button>
//         </div>
//       </form>

//       <style>{`
//         @keyframes fade {
//           from { opacity: 0; transform: translateY(-5px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade {
//           animation: fade 0.4s ease-in-out;
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [otp, setOtp] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  // Countdown for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Auto-check if user already verified
  useEffect(() => {
    const checkIfVerified = async () => {
      try {
        const { data: userData, error } = await supabase.auth.getUser();
        if (error) return;
        if (userData?.user?.email_confirmed_at) {
          setMessage("✅ Email already verified! Redirecting...");
          setTimeout(() => navigate("/"), 2000);
        }
      } catch (err) {
        console.error("Verification check error:", err);
      }
    };
    checkIfVerified();
  }, [navigate]);

  // ✅ Handle OTP Verification
  const handleOtpVerification = async () => {
    if (!email || !otp.trim()) {
      setErrorMsg("Please enter your email and 6-digit code.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setMessage("");

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp.trim(),
        type: "signup",
      });

      if (error) throw error;

      if (data?.user?.email_confirmed_at) {
        setMessage("✅ Verified successfully! Redirecting to main site...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setErrorMsg("⚠️ Invalid or expired code. Try again.");
      }
    } catch (error) {
      setErrorMsg("❌ " + (error.message || "Verification failed."));
    } finally {
      setLoading(false);
    }
  };

  // ✉️ Resend OTP Code
  const handleResend = async () => {
    if (!email) {
      setErrorMsg("Missing email. Please sign up again.");
      return;
    }

    setResendLoading(true);
    setErrorMsg("");
    setMessage("");

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      });

      if (error) throw error;

      setMessage("📩 A new verification code has been sent!");
      setCountdown(60);
    } catch (error) {
      setErrorMsg("⚠️ " + error.message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-20"
      >
        <source src="/videos/aurora.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-indigo-950/70 to-black/90 -z-10"></div>

      {/* Header */}
      <div className="absolute top-6 left-6 flex items-center gap-3">
        <img
          src="/logo23.jpg"
          alt="Logo"
          className="h-10 w-10 rounded-full shadow-lg border border-white/30"
        />
        <button
          onClick={() => navigate("/login")}
          className="text-sm text-indigo-300 hover:text-pink-400 transition-all"
        >
          ← Back to Login
        </button>
      </div>

      {/* Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 p-8 sm:p-10 rounded-3xl shadow-[0_0_35px_rgba(0,0,0,0.3)] w-full max-w-md text-white space-y-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Verify Your Email
        </h1>

        <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
          A verification code was sent to{" "}
          <span className="font-semibold text-indigo-300 break-words">{email}</span>.
          <br />
          Enter it below to confirm your account.
        </p>

        {/* OTP Input */}
        <div className="mt-6">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 
            border border-white/30 focus:ring-2 focus:ring-indigo-400 focus:outline-none 
            transition-all text-center text-xl tracking-[0.5em] sm:tracking-[1em]"
          />
          <button
            onClick={handleOtpVerification}
            disabled={loading}
            className="mt-4 w-full py-3 rounded-xl font-bold text-white 
            bg-gradient-to-r from-indigo-400 to-pink-500 hover:from-pink-500 hover:to-indigo-400 
            transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </div>

        {/* Messages */}
        {errorMsg && <p className="text-red-400 text-sm sm:text-base">{errorMsg}</p>}
        {message && <p className="text-green-400 text-sm sm:text-base">{message}</p>}

        {/* Resend & Links */}
        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={handleResend}
            disabled={resendLoading || countdown > 0}
            className={`text-blue-300 hover:text-blue-400 text-sm font-medium transition-all ${
              resendLoading || countdown > 0 ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {countdown > 0
              ? `⏳ Resend in ${countdown}s`
              : resendLoading
              ? "Sending..."
              : "Resend Code"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="block mx-auto text-pink-400 hover:text-pink-300 text-sm"
          >
            Wrong email? Sign up again
          </button>
        </div>
      </div>
    </div>
  );
}