import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import bcrypt from "bcryptjs"; // Make sure to install bcryptjs
import API_BASE_URL from "../config";

// ✅ Hardcoded admin info
const ADMIN_EMAIL = "geomancysolutions@gmail.com";
const ADMIN_HASH = "$2a$10$JQWKGJmWuAr5NTtd1lz8ueqkvLXUvs3d6.3HnPkxJPz9fCrrTQ6mi"; // bcrypt hash for 'admin123'

function LoginForm({ onLogin }) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));
    if (savedUser) {
      setFullname(savedUser.fullname || "");
      setEmail(savedUser.email || "");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullname || !email || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // ✅ Admin login check
      if (email === ADMIN_EMAIL) {
        const isValid = await bcrypt.compare(password, ADMIN_HASH);
        if (isValid) {
          const adminUser = { fullname, email, role: "admin" };
          if (rememberMe) localStorage.setItem("user", JSON.stringify(adminUser));
          else sessionStorage.setItem("user", JSON.stringify(adminUser));

          onLogin(adminUser);
          navigate("/"); // <-- admin goes to MainSite
          return;
        } else {
          setErrorMsg("Invalid admin password.");
          setLoading(false);
          return;
        }
      }

      // 🌐 Normal backend login
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });



      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Login failed");
        setLoading(false);
        return;
      }

      const user = { ...data.user, fullname: data.user.fullname || fullname };
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", data.token);
      } else {
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", data.token);
      }

      onLogin(user);
      navigate("/"); // <-- all users go to MainSite
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Network error. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/spiritual-realm.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/60 to-black/80"></div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl max-w-md w-full space-y-6 z-30"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500">
            Numbers to Solutions
          </h1>
          <p className="text-sm sm:text-base font-bold text-gray-200">
            Enter your details to unlock your spiritual guidance
          </p>
        </div>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border border-white/30 bg-white/20 text-white placeholder-gray-300 p-3 rounded-lg"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-white/30 bg-white/20 text-white placeholder-gray-300 p-3 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border border-white/30 bg-white/20 text-white placeholder-gray-300 p-3 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-200 hover:text-orange-300"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <label className="flex items-center space-x-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4"
          />
          <span>Remember Me</span>
        </label>

        {errorMsg && <p className="text-red-400 font-semibold text-sm">{errorMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-orange-400 to-red-500 hover:from-red-500 hover:to-orange-400 text-white font-bold rounded-lg disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-300">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-orange-400 hover:underline">
            Sign Up
          </Link>
        </p>
        <p className="text-center text-sm">
          <Link to="/forgot-password" className="text-red-400 hover:underline">
            Forgot Password?
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
