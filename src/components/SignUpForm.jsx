import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function SignupForm({ onLogin }) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullname || !email || !password) {
      setErrorMsg("All fields are required.");
      return;
    }
    if (!agreeTerms) {
      setErrorMsg("You must accept the Terms & Conditions.");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create user in Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) throw signUpError;

      // 2️⃣ Ensure Supabase session is ready
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      const userId = sessionData?.session?.user?.id;
      if (!userId) throw new Error("User session not found after signup.");

      // 3️⃣ Insert into profiles (RLS-safe)
      const { error: profileError } = await supabase.from("profiles").insert([
        { user_id: userId, fullname, role: "user" },
      ]);
      if (profileError) throw profileError;

      // 4️⃣ Save user locally
      const user = { ...authData.user, fullname, role: "user" };
      localStorage.setItem("user", JSON.stringify(user));
      if (onLogin) onLogin(user);

      // 5️⃣ Redirect to main site
      navigate("/");
    } catch (err) {
      setErrorMsg(err.message || "Sign up failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-blue-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src="/videos/spiritual-realm.mp4" type="video/mp4" />
        </video>
      </div>

      <form
        onSubmit={handleSignup}
        className="relative z-20 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl max-w-md w-full space-y-6"
      >
        <h1 className="text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-400 to-purple-500">
          Create Your Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
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
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-200 hover:text-green-300"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <label className="flex items-center text-white text-sm">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mr-2"
          />
          I agree to the <span className="text-green-300 ml-1">Terms & Conditions</span>
        </label>

        {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-bold rounded-lg disabled:opacity-50 transition-all"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <div className="flex justify-between text-sm text-gray-200">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-green-400 hover:underline"
          >
            Already have an account? Login
          </button>
        </div>
      </form>
    </div>
  );
}
