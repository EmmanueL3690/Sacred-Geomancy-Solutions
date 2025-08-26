// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom"

const ADMIN_EMAIL = "geomancyadmin@gmail.com"

export default function ProtectedRoute({ user, children, adminOnly }) {
  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && user.email !== ADMIN_EMAIL) {
    return <Navigate to="/" replace />
  }

  return children
}
