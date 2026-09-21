import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import PublicLayout from "../components/layout/PublicLayout";
import { DashboardContainer } from "../components/layout/DashboardContainer";

// Route Guard
import ProtectedRoute from "../routes/ProtectedRoute";

// Public Pages
import LandingPage from "../pages/Landing/LandingPage";
import LoginPage from "../pages/Auth/Login";
import AuthLayout from "../components/AuthLayout";
import RegisterPage from "../pages/Auth/Signup";
import ContactPage from "../pages/Landing/ContactPage";
import ServicesPage from "../pages/Landing/ServicesPage";

// Dashboard Pages
import Home from "../pages/Dashboard/Home";
// import Profile from "../pages/Dashboard/Profile";
import SubmissionHistory from "../pages/Dashboard/SubmissionHistory";
import SubmitNumbers from "../pages/Dashboard/SubmitNumbers";
// import Notifications from "../pages/Dashboard/Notifications";
// import Testimonies from "../pages/Dashboard/Testimonies";
// import Settings from "../pages/Dashboard/Settings";

// Admin Module Routes
import AdminRoutes from "../admin/routes/AdminRoutes";

export default function AppRouter() {
  return (
    <Routes>
      {/* =======================
            PUBLIC WEBSITE
      ======================== */}
      <Route element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* =======================
            AUTH
      ======================== */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
      </Route>

      {/* =========================
            PROTECTED USER ROUTES
      ========================== */}
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<DashboardContainer />}>
          <Route index element={<Home />} />
          <Route path="submit" element={<SubmitNumbers />} />
          <Route path="history" element={<SubmissionHistory />} />
          {/* <Route path="testimonies" element={<Testimonies />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} /> */}
        </Route>
      </Route>

      {/* =========================
            ADMIN DASHBOARD ROUTES
      ========================== */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* =========================
            404 FALLBACK
      ========================== */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}