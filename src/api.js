const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://auth-backend-1qly.onrender.com/api/auth";

export const api = {
  // Login user
  login: async (email, password) => {
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Login failed");
      }

      return await res.json();
    } catch (err) {
      console.error("Login Error:", err);
      return { success: false, message: err.message };
    }
  },

  // Signup user
  signup: async (fullname, email, password) => {
    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ fullname, email, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Signup failed");
      }

      return await res.json();
    } catch (err) {
      console.error("Signup Error:", err);
      return { success: false, message: err.message };
    }
  },

  // Verify email
  verifyEmail: async (email, code) => {
    try {
      const res = await fetch(`${BASE_URL}/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, code }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Verification failed");
      }

      return await res.json();
    } catch (err) {
      console.error("Verify Email Error:", err);
      return { success: false, message: err.message };
    }
  },

  // Resend verification code
  resendCode: async (email) => {
    try {
      const res = await fetch(`${BASE_URL}/resend-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Resend code failed");
      }

      return await res.json();
    } catch (err) {
      console.error("Resend Code Error:", err);
      return { success: false, message: err.message };
    }
  },

  // ✅ Forgot Password
  forgotPassword: async (email) => {
    try {
      const res = await fetch(`${BASE_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to send reset link");
      }

      return await res.json();
    } catch (err) {
      console.error("Forgot Password Error:", err);
      return { success: false, message: err.message };
    }
  },

  // ✅ Reset Password
  resetPassword: async (token, password) => {
    try {
      const res = await fetch(`${BASE_URL}/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Password reset failed");
      }

      return await res.json();
    } catch (err) {
      console.error("Reset Password Error:", err);
      return { success: false, message: err.message };
    }
  },
};