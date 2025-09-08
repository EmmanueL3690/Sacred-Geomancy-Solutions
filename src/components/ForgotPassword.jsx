// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { supabase } from "../supabaseClient";

// function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setErrorMsg("");

//     if (!email) {
//       setErrorMsg("Please enter your email.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
//         redirectTo: `${window.location.origin}/reset-password`, // optional: link users to your reset page
//       });

//       if (error) throw error;

//       setMessage("Password reset instructions have been sent to your email.");
//     } catch (err) {
//       console.error("Forgot password error:", err);
//       setErrorMsg(err.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover"
//       >
//         <source src="/videos/spiritual-realm.mp4" type="video/mp4" />
//       </video>
//       <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/60 to-black/80"></div>

//       <form
//         onSubmit={handleSubmit}
//         className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl max-w-md w-full space-y-6 z-30"
//       >
//         <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 text-center">
//           Forgot Password
//         </h1>
//         <p className="text-sm text-gray-200 text-center">
//           Enter your email to receive password reset instructions
//         </p>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border border-white/30 bg-white/20 text-white placeholder-gray-300 p-3 rounded-lg"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         {errorMsg && (
//           <p className="text-red-400 font-semibold text-sm text-center">
//             {errorMsg}
//           </p>
//         )}
//         {message && (
//           <p className="text-green-400 font-semibold text-sm text-center">
//             {message}
//           </p>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 bg-gradient-to-r from-orange-400 to-red-500 hover:from-red-500 hover:to-orange-400 text-white font-bold rounded-lg disabled:opacity-50"
//         >
//           {loading ? "Sending..." : "Send Reset Link"}
//         </button>

//         <p className="text-center text-sm text-gray-300">
//           Remembered your password?{" "}
//           <Link to="/login" className="text-orange-400 hover:underline">
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default ForgotPassword;
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword({ onShowLogin }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setMessage("");

    if (!email) {
      setErrorMsg("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;

      setMessage("Check your email for the password reset link!");
    } catch (err) {
      setErrorMsg(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleReset}
      className="max-w-md mx-auto mt-20 p-6 bg-white/10 backdrop-blur-xl rounded-xl space-y-4"
    >
      <h1 className="text-2xl font-bold text-center text-white">Forgot Password</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 rounded bg-white/20 text-white"
      />

      {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
      {message && <p className="text-green-400 text-sm">{message}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-red-500 py-2 rounded text-white font-bold"
      >
        {loading ? "Sending..." : "Send Reset Email"}
      </button>

      <p className="text-center text-sm text-gray-200 mt-2">
        Remember your password?{" "}
        <button onClick={onShowLogin} className="text-orange-400 hover:underline">
          Login
        </button>
      </p>
    </form>
  );
}
