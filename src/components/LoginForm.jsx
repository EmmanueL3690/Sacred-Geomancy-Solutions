import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ onLogin }) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullname || !email || !password) return;

    const userData = { fullname, email, password };
    onLogin(userData);

    // Save in localStorage (redundant, but keeps LoginForm independent)
    localStorage.setItem("user", JSON.stringify(userData));

    navigate("/"); // Redirect to main site
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-blue-800 to-red-500 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md w-full space-y-6"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Numbers to Solutions
          </h1>
          <p className="text-sm sm:text-base font-bold text-gray-700">
            Enter your details to unlock your spiritual guidance
          </p>
        </div>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-orange-400 to-red-500 hover:from-red-500 hover:to-orange-400 text-white font-bold rounded-lg transition-all duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
