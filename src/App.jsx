import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import MainSite from "./components/MainSite";
import AdminProfile from "./components/AdminProfile";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = ({ email, fullname, password }) => {
    // You can replace this with real auth later
    if (email === "geomancysolutions@gmail.com" && password === "admin123") {
      setUser({ email, role: "admin", name: fullname });
    } else {
      setUser({ email, role: "user", name: fullname });
    }
  };

  const handleLogout = () => setUser(null);

  return (
    <Routes>
      {/* Home / Main site */}
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

      {/* Login Page */}
      <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />

      {/* Admin Profile (only admin) */}
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

      {/* Catch-all → redirect home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

