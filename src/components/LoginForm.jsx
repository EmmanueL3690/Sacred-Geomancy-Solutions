import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    onLogin(email);
    navigate("/"); // after login → go to main site
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-80"
      >
            <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-2">
              Numbers to Solutions
            </h1>
            <p className="text-sm sm:text-base font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Your Problem, Your Solution in 4 Numbers
            </p>
          </div>
  
          
        <input
          type="email"
          placeholder="Enter email"
          className="w-full border p-2 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
