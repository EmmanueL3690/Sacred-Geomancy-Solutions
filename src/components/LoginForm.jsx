// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { supabase } from "../supabaseClient";

// const ADMIN_EMAIL = "geomancysolutions@gmail.com";

// function LoginForm({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");

//     if (!email || !password) {
//       setErrorMsg("Please enter email and password.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Admin login check
//       if (email === ADMIN_EMAIL) {
//         const { data, error } = await supabase
//           .from("profiles")
//           .select("*")
//           .eq("email", email)
//           .single();

//         if (!data || data.role !== "admin") {
//           setErrorMsg("Invalid admin credentials.");
//           setLoading(false);
//           return;
//         }

//         // Admin login successful
//         const adminUser = { email, fullname: data.fullname, role: "admin" };
//         if (rememberMe) localStorage.setItem("user", JSON.stringify(adminUser));
//         else sessionStorage.setItem("user", JSON.stringify(adminUser));

//         onLogin(adminUser);
//         navigate("/admin"); // admin dashboard
//         return;
//       }

//       // Normal user login
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (error) throw error;

//       const { data: profileData } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("user_id", data.user.id)
//         .single();

//       const user = {
//         ...data.user,
//         fullname: profileData.fullname,
//         role: profileData.role,
//       };

//       if (rememberMe) localStorage.setItem("user", JSON.stringify(user));
//       else sessionStorage.setItem("user", JSON.stringify(user));

//       onLogin(user);

//       // Redirect based on role
//       if (user.role === "admin") navigate("/admin");
//       else navigate("/");
//     } catch (err) {
//       setErrorMsg(err.message || "Login failed. Check credentials.");
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
//           Login
//         </h1>

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border border-white/30 bg-white/20 text-white placeholder-gray-300 p-3 rounded-lg"
//         />
//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full border border-white/30 bg-white/20 text-white placeholder-gray-300 p-3 rounded-lg"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-200 hover:text-orange-300"
//           >
//             {showPassword ? "Hide" : "Show"}
//           </button>
//         </div>

//         <label className="flex items-center space-x-2 text-sm text-gray-300">
//           <input
//             type="checkbox"
//             checked={rememberMe}
//             onChange={(e) => setRememberMe(e.target.checked)}
//             className="w-4 h-4"
//           />
//           <span>Remember Me</span>
//         </label>

//         {errorMsg && <p className="text-red-400 font-semibold text-sm">{errorMsg}</p>}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 bg-gradient-to-r from-orange-400 to-red-500 hover:from-red-500 hover:to-orange-400 text-white font-bold rounded-lg disabled:opacity-50"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <p className="text-center text-sm text-gray-300">
//           Don’t have an account? <Link to="/signup" className="text-orange-400 hover:underline">Sign Up</Link>
//         </p>
//         <p className="text-center text-sm">
//           <Link to="/forgot-password" className="text-red-400 hover:underline">Forgot Password?</Link>
//         </p>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

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
      // Admin login
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

      // Normal user login via Supabase
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setErrorMsg(signInError.message.includes("Invalid login credentials")
          ? "Email not registered. Please click 'Sign Up' to create an account."
          : signInError.message
        );
        return;
      }

      if (!signInData.user) {
        setErrorMsg("Login failed. No user returned.");
        return;
      }

      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", signInData.user.id)
        .single();

      if (profileError) throw profileError;

      const user = {
        ...signInData.user,
        fullname: profile?.fullname || "",
        role: profile?.role || "user",
      };

      localStorage.setItem("user", JSON.stringify(user));
      onLogin(user);
      navigate("/dashboard");
    } catch (err) {
      setErrorMsg(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-blue-700 relative overflow-hidden p-4">

      <div className="absolute inset-0 opacity-30">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src="/videos/spiritual-realm.mp4" type="video/mp4" />
        </video>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-20 bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl sm:text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-400 to-purple-500">
          Login
        </h1>

        <input
          type="text"
          placeholder="Full Name (Optional)"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 text-sm sm:text-base"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 text-sm sm:text-base"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 text-sm sm:text-base"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-200 hover:text-orange-300"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-bold rounded-lg disabled:opacity-50 transition-all text-sm sm:text-base"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex justify-center text-sm sm:text-base text-gray-200 mt-2">
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-green-400 hover:underline"
          >
            Don’t have an account? Sign up
          </button>
          {/* Forgot Password hidden for now */}
        </div>
      </form>
    </div>
  );
}
