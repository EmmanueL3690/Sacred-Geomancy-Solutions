import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import ForgotPassword from "./components/ForgotPassword";
import MainSite from "./components/MainSite";
import AdminProfile from "./components/AdminProfile";
import ResetPassword from "./components/ResetPassword";
import LandingPage from "./components/landingpage";
import VerifyEmail from "./components/VerifyEmail";
import AuthLayout from "./components/AuthLayout"; // ✅ Import shared layout

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* 🔒 Main Site (Protected) */}
      <Route
        path="/main"
        element={
          user ? (
            <MainSite user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* 🧱 Auth Pages inside shared AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Route>

      {/* 🔑 Reset Password */}
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* 👑 Admin Panel (Protected + Role Check) */}
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

      {/* 🌍 Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
