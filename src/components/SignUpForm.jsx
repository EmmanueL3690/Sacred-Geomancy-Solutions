import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignupForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      // ✅ Create account
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // ✅ Save user profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullname,
        email,
        role: "user", // default role
        createdAt: new Date(),
      });

      // ✅ Store locally
      const newUser = {
        uid: user.uid,
        email,
        fullname,
        role: "user",
      };
      localStorage.setItem("user", JSON.stringify(newUser));

      // ✅ Direct to MAIN site (not dashboard anymore)
      navigate("/main");
    } catch (err) {
      // 🔒 Enhanced error messages
      if (err.code === "auth/email-already-in-use") {
        setErrorMsg("This email is already registered. Please log in instead.");
      } else if (err.code === "auth/invalid-email") {
        setErrorMsg("Invalid email format.");
      } else if (err.code === "auth/weak-password") {
        setErrorMsg("Password is too weak. Use at least 6 characters.");
      } else {
        setErrorMsg("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-black to-green-700 p-4">
      <form
        onSubmit={handleSignup}
        className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl sm:text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-green-400 to-purple-500">
          Create Account
        </h1>
        <p className="text-center text-white">
          Register to access your personal dashboard
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
          required
        />

        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
          required
        />

        {errorMsg && (
          <p className="text-red-400 text-center text-sm">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-400 to-green-500 hover:from-green-500 hover:to-blue-400 text-white font-bold rounded-lg disabled:opacity-50 transition-all"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <div className="flex justify-between text-sm text-gray-200 mt-2">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-400 hover:underline"
          >
            Already have an account? Log in
          </button>
        </div>
      </form>
    </div>
  );
}