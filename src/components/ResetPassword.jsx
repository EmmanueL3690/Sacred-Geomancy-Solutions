// import { useState, useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { supabase } from "../supabaseClient";

// export default function ResetPassword({ onShowLogin }) {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const token = searchParams.get("access_token"); // Supabase passes this in the reset link

//   const handleReset = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     setSuccessMsg("");

//     if (!password || !confirmPassword) {
//       setErrorMsg("Please fill in both fields.");
//       return;
//     }
//     if (password !== confirmPassword) {
//       setErrorMsg("Passwords do not match.");
//       return;
//     }

//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
//     if (!passwordRegex.test(password)) {
//       setErrorMsg(
//         "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
//       );
//       return;
//     }

//     setLoading(true);

//     try {
//       const { data, error } = await supabase.auth.updateUser({
//         access_token: token,
//         password,
//       });
//       if (error) throw error;

//       setSuccessMsg("Password updated successfully! Redirecting to login...");
//       setTimeout(() => navigate("/login"), 3000);
//     } catch (err) {
//       setErrorMsg(err.message || "Failed to reset password.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleReset}
//       className="max-w-md mx-auto mt-20 p-6 bg-white/10 backdrop-blur-xl rounded-xl space-y-4"
//     >
//       <h1 className="text-2xl font-bold text-center text-white">Reset Password</h1>

//       <input
//         type="password"
//         placeholder="New Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="w-full p-2 rounded bg-white/20 text-white"
//       />

//       <input
//         type="password"
//         placeholder="Confirm New Password"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//         className="w-full p-2 rounded bg-white/20 text-white"
//       />

//       {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
//       {successMsg && <p className="text-green-400 text-sm">{successMsg}</p>}

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-orange-500 hover:bg-red-500 py-2 rounded text-white font-bold"
//       >
//         {loading ? "Updating..." : "Reset Password"}
//       </button>

//       <p className="text-center text-sm text-gray-200 mt-2">
//         Remembered your password?{" "}
//         <button onClick={onShowLogin} className="text-orange-400 hover:underline">
//           Login
//         </button>
//       </p>
//     </form>
//   );
// }


import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../firebase";
import { confirmPasswordReset } from "firebase/auth";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const oobCode = searchParams.get("oobCode"); // code from Firebase email link

  const handleReset = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("Password reset successful! You can now login.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setErrorMsg(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-indigo-900 p-4">
      <form
        onSubmit={handleReset}
        className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl sm:text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
          required
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
          required
        />

        {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
        {message && <p className="text-green-400 text-sm">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-pink-400 to-red-500 hover:from-red-500 hover:to-pink-400 text-white font-bold rounded-lg disabled:opacity-50 transition-all"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}