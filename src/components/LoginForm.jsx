
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

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
      // ✅ Hardcoded Admin Login
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const adminUser = {
          email,
          fullname: fullname || "Admin",
          role: "admin",
        };
        localStorage.setItem("user", JSON.stringify(adminUser));
        onLogin(adminUser);
        navigate("/dashboard");
        return;
      }

      // ✅ Normal Firebase login
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // Fetch profile from Firestore
      const docRef = doc(db, "users", user.uid);
      const snap = await getDoc(docRef);

      let profileData = {};
      if (snap.exists()) profileData = snap.data();

      const finalUser = {
        uid: user.uid,
        email: user.email,
        fullname: profileData.fullname || "",
        role: profileData.role || "user",
      };

      localStorage.setItem("user", JSON.stringify(finalUser));
      onLogin(finalUser);
      navigate("/dashboard");
    } catch (err) {
      setErrorMsg(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-blue-700 p-4">

       <div className="absolute inset-0 opacity-30">         <video autoPlay loop muted className="w-full h-full object-cover">
           <source src="/videos/spiritual-realm.mp4" type="video/mp4" />
        </video>
       </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl sm:text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-400 to-purple-500">
          Numbers to Solutions
        </h1>
        <p className="text-center text-white">
          Enter your details to unlock your spiritual guidance
        </p>

        <input
          type="text"
          placeholder="Full Name (Optional)"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-200"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-bold rounded-lg disabled:opacity-50 transition-all"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex justify-between text-sm text-gray-200 mt-2">
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-green-400 hover:underline"
          >
            Don’t have an account? Sign up
          </button>
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-orange-400 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
}