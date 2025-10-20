// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";

// const ADMIN_EMAIL = "geomancysolutions@gmail.com";
// const ADMIN_PASSWORD = "admin123";

// export default function LoginForm({ onLogin }) {
//   const [fullname, setFullname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     setLoading(true);

//     try {
//       // ✅ Hardcoded Admin Login
//       if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
//         const adminUser = {
//           email,
//           fullname: fullname || "Admin",
//           role: "admin",
//         };
//         localStorage.setItem("user", JSON.stringify(adminUser));
//         onLogin(adminUser);
//         navigate("/main"); // always send to main
//         return;
//       }

//       // ✅ Normal Firebase login
//       const userCred = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCred.user;

//       // Fetch profile from Firestore
//       const docRef = doc(db, "users", user.uid);
//       const snap = await getDoc(docRef);

//       let profileData = {};
//       if (snap.exists()) profileData = snap.data();

//       const finalUser = {
//         uid: user.uid,
//         email: user.email,
//         fullname: profileData.fullname || "",
//         role: profileData.role || "user",
//       };

//       localStorage.setItem("user", JSON.stringify(finalUser));
//       onLogin(finalUser);
//       navigate("/main"); // always send to main
//     } catch (err) {
//       if (err.code === "auth/user-not-found") {
//         setErrorMsg("No account found with this email. Please sign up first.");
//       } else if (err.code === "auth/wrong-password") {
//         setErrorMsg("Incorrect password. Try again.");
//       } else if (err.code === "auth/invalid-email") {
//         setErrorMsg("Invalid email format.");
//       } else {
//         setErrorMsg("No account found with this email. Please sign up first.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center relative p-4 overflow-hidden">
//       {/* 🌌 Background Video */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover"
//       >
//         <source src="/videos/aurora.mp4" type="video/mp4" />
//       </video>

//       {/* 🌌 Overlay for readability */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80" />

//       {/* 🔮 Login Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
//       >
//         <h1 className="text-2xl sm:text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-400 to-purple-500">
//           Numbers to Solutions
//         </h1>
//         <p className="text-center text-white">
//           Enter your details to unlock your spiritual guidance
//         </p>

//         <input
//           type="text"
//           placeholder="Full Name (Optional)"
//           value={fullname}
//           onChange={(e) => setFullname(e.target.value)}
//           className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
//           required
//         />

//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
//             required
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-200"
//           >
//             {showPassword ? "Hide" : "Show"}
//           </button>
//         </div>

//         {errorMsg && (
//           <div className="text-center">
//             <p className="text-red-400 text-sm mb-2">{errorMsg}</p>
//             {errorMsg.includes("sign up") && (
//               <button
//                 type="button"
//                 onClick={() => navigate("/signup")}
//                 className="text-blue-400 underline"
//               >
//                 Go to Sign Up
//               </button>
//             )}
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-bold rounded-lg disabled:opacity-50 transition-all"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <div className="flex justify-between text-sm text-gray-200 mt-2">
//           <button
//             type="button"
//             onClick={() => navigate("/signup")}
//             className="text-green-400 hover:underline"
//           >
//             Don’t have an account? Sign up
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate("/forgot-password")}
//             className="text-orange-400 hover:underline"
//           >
//             Forgot Password?
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
// "use client";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Eye, EyeOff, Loader2 } from "lucide-react";
// import { api } from "../api";

// const ADMIN_EMAIL = "geomancysolutions@gmail.com";
// const ADMIN_PASSWORD = "admin123";

// export default function LoginForm({ onLogin }) {
//   const [fullname, setFullname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     setLoading(true);

//     try {
//       // ✅ Local admin login
//       if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
//         const adminUser = { email, fullname: fullname || "Admin", role: "admin" };
//         localStorage.setItem("user", JSON.stringify(adminUser));
//         onLogin(adminUser);
//         navigate("/main");
//         return;
//       }

//       // ✅ Backend login
//       const data = await api.login(email, password);

//       if (data.status === "success") {
//         localStorage.setItem("token", data.accessToken);
//         localStorage.setItem("user", JSON.stringify(data.user));
//         onLogin(data.user);
//         navigate("/main");
//       } else {
//         if (data.message?.includes("verify")) {
//           setErrorMsg("Please verify your email before logging in.");
//         } else {
//           setErrorMsg(data.message || "Login failed. Try again.");
//         }
//       }
//     } catch {
//       setErrorMsg("Server error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <motion.form
//       onSubmit={handleSubmit}
//       initial={{ opacity: 0, y: 25 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="relative bg-white/10 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_0_25px_rgba(255,255,255,0.05)] w-full max-w-md mx-auto space-y-6"
//     >
//       {/* Header */}
//       <div className="text-center space-y-2">
//         <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-400 to-purple-400 tracking-tight">
//           Numbers to Solutions
//         </h1>
//         <p className="text-gray-300 text-sm">Enter your details to unlock guidance</p>
//       </div>

//       {/* Fullname */}
//       <div>
//         <input
//           type="text"
//           placeholder="Full Name (Optional)"
//           value={fullname}
//           onChange={(e) => setFullname(e.target.value)}
//           className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all"
//         />
//       </div>

//       {/* Email */}
//       <div>
//         <input
//           type="email"
//           placeholder="Email Address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all"
//           required
//         />
//       </div>

//       {/* Password with toggle */}
//       <div className="relative">
//         <input
//           type={showPassword ? "text" : "password"}
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all"
//           required
//         />
//         <button
//           type="button"
//           onClick={() => setShowPassword(!showPassword)}
//           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
//         >
//           {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//         </button>
//       </div>

//       {/* Error Message */}
//       {errorMsg && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-center text-red-400 text-sm"
//         >
//           {errorMsg}
//         </motion.div>
//       )}

//       {/* Login Button */}
//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-purple-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center"
//       >
//         {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : "Login"}
//       </button>

//       {/* Links */}
//       <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-300 gap-3 pt-2">
//         <button
//           type="button"
//           onClick={() => navigate("/signup")}
//           className="text-cyan-300 hover:text-purple-300 transition"
//         >
//           Don’t have an account? Sign up
//         </button>
//         <button
//           type="button"
//           onClick={() => navigate("/forgot-password")}
//           className="text-orange-400 hover:text-yellow-300 transition"
//         >
//           Forgot Password?
//         </button>
//       </div>
//     </motion.form>
//   );
// }

"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient"; // ✅ Import Supabase client

const ADMIN_EMAIL = "geomancysolutions@gmail.com";
const ADMIN_PASSWORD = "admin123";

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
      // ✅ Local admin login
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const adminUser = { email, fullname: fullname || "Admin", role: "admin" };
        localStorage.setItem("user", JSON.stringify(adminUser));
        onLogin(adminUser);
        navigate("/main");
        return;
      }

      // ✅ Supabase login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Email not confirmed")) {
          setErrorMsg("Please verify your email before logging in.");
        } else {
          setErrorMsg(error.message);
        }
        return;
      }

      // ✅ Save user in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      onLogin(data.user);
      navigate("/main");
    } catch (err) {
      setErrorMsg("Server error. Please try again later.");
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

      {/* Fullname */}
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

      {/* Error Message */}
      {errorMsg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-red-400 text-sm"
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

      {/* Links */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-300 gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="text-cyan-300 hover:text-purple-300 transition"
        >
          Don’t have an account? Sign up
        </button>
        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
          className="text-orange-400 hover:text-yellow-300 transition"
        >
          Forgot Password?
        </button>
      </div>
    </motion.form>
  );
}