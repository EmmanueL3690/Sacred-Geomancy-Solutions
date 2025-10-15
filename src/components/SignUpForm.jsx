// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";

// export default function SignupForm() {
//   const [fullname, setFullname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     setLoading(true);

//     try {
//       // ✅ Create account
//       const userCred = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCred.user;

//       // ✅ Save user profile in Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         uid: user.uid,
//         fullname,
//         email,
//         role: "user", // default role
//         createdAt: new Date(),
//       });

//       // ✅ Store locally
//       const newUser = {
//         uid: user.uid,
//         email,
//         fullname,
//         role: "user",
//       };
//       localStorage.setItem("user", JSON.stringify(newUser));

//       // ✅ Direct to MAIN site
//       navigate("/main");
//     } catch (err) {
//       if (err.code === "auth/email-already-in-use") {
//         setErrorMsg("This email is already registered. Please log in instead.");
//       } else if (err.code === "auth/invalid-email") {
//         setErrorMsg("Invalid email format.");
//       } else if (err.code === "auth/weak-password") {
//         setErrorMsg("Password is too weak. Use at least 6 characters.");
//       } else {
//         setErrorMsg("Signup failed. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
//       {/* 🔹 Background Video */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute top-0 left-0 w-full h-full object-cover -z-10"
//       >
//         <source src="/videos/aurora.mp4" type="video/mp4" />
//       </video>

//       {/* 🔹 Signup Form */}
//       <form
//         onSubmit={handleSignup}
//         className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 z-10"
//       >
//         <h1 className="text-2xl sm:text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-green-400 to-purple-500">
//           Create Account
//         </h1>
//         <p className="text-center text-white">
//           Register to access your personal dashboard
//         </p>

//         <input
//           type="text"
//           placeholder="Full Name"
//           value={fullname}
//           onChange={(e) => setFullname(e.target.value)}
//           className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
//           required
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password (min 6 characters)"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
//           required
//         />

//         {errorMsg && (
//           <p className="text-red-400 text-center text-sm">{errorMsg}</p>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 bg-gradient-to-r from-blue-400 to-green-500 hover:from-green-500 hover:to-blue-400 text-white font-bold rounded-lg disabled:opacity-50 transition-all"
//         >
//           {loading ? "Signing up..." : "Sign Up"}
//         </button>

//         <div className="flex justify-between text-sm text-gray-200 mt-2">
//           <button
//             type="button"
//             onClick={() => navigate("/login")}
//             className="text-blue-400 hover:underline"
//           >
//             Already have an account? Log in
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, User, Mail, Lock } from "lucide-react";
import { api } from "../api";

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
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const data = await api.signup(fullname, email, password);

      if (data.status === "success") {
        setSuccessMsg("Signup successful! Check your email for a verification code.");
        setTimeout(() => navigate(`/verify-email?email=${encodeURIComponent(email)}`), 1500);
      } else {
        setErrorMsg(data.message || "Signup failed. Please try again.");
      }
    } catch {
      setErrorMsg("Server error. Please try again later.");
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
      className="relative bg-white/10 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_0_25px_rgba(255,255,255,0.05)] w-full max-w-md mx-auto space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-green-400 to-purple-400 tracking-tight">
          Create Account
        </h1>
        <p className="text-gray-300 text-sm">
          Register to access your personal dashboard
        </p>
      </div>

      {/* Fullname */}
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full p-3 pl-10 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all"
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
          className="w-full p-3 pl-10 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all"
          required
        />
      </div>

      {/* Password */}
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="password"
          placeholder="Password (8+ chars, upper, lower, number, special)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 pl-10 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all"
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
          className="w-full p-3 pl-10 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all"
          required
        />
      </div>

      {/* Error/Success Messages */}
      {errorMsg && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400 text-center text-sm"
        >
          {errorMsg}
        </motion.p>
      )}
      {successMsg && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-400 text-center text-sm"
        >
          {successMsg}
        </motion.p>
      )}

      {/* Signup Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-purple-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center"
      >
        {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : "Sign Up"}
      </button>

      {/* Footer */}
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
