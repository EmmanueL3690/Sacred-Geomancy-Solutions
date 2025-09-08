import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import ForgotPassword from "./components/ForgotPassword";
import MainSite from "./components/MainSite";
import AdminProfile from "./components/AdminProfile";
import ResetPassword from "./components/ResetPassword";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from storage
    const savedUser =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  // Handle login
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Routes>
      {/* Home/Main Site accessible to logged-in users */}
      <Route
        path="/"
        element={
          user ? (
            <MainSite user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Login page */}
      <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />

      {/* Sign Up page */}
      <Route path="/signup" element={<SignUpForm onLogin={handleLogin} />} />



      {/* Forgot Password page */}
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/reset-password/:token" element={<ResetPassword />} />


      {/* Admin Panel accessible only to admin */}
      <Route
        path="/admin"
        element={
          user ? (
            user.role === "admin" ? (
              <AdminProfile user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
