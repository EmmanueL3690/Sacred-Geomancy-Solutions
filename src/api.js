const BASE_URL =
  import.meta.env.VITE_API_URL || "https://auth-backend-1qly.onrender.com/api/auth";

export const api = {
  // Login user
  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // allows cookies from backend
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  // Signup user
  signup: async (fullname, email, password) => {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ fullname, email, password }),
    });
    return res.json();
  },

  // Verify email
  verifyEmail: async (email, code) => {
    const res = await fetch(`${BASE_URL}/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, code }),
    });
    return res.json();
  },

  // Resend verification code
  resendCode: async (email) => {
    const res = await fetch(`${BASE_URL}/resend-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    });
    return res.json();
  },
};
