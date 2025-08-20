"use client";

import { useState } from "react";
import { Card } from "./ui/Card.jsx";

export default function LoginForm({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between Sign Up / Login
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    otp: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      // Sign Up validations
      if (!formData.terms) {
        alert("You must accept the Terms & Conditions");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      if (!formData.name || !formData.phone || !formData.address || !formData.password) {
        alert("Please fill all required fields");
        return;
      }
    } else {
      // Login validations
      if (!formData.phone || !formData.password) {
        alert("Please enter phone number and password");
        return;
      }
    }

    // Pass data to parent handler
    onLogin(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border-3">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-2">
              Numbers to Solutions
            </h1>
            <p className="text-sm sm:text-base font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Your Problem, Your Solution in 4 Numbers
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-black font-medium text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter your address"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-black font-medium text-base resize-none"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-bold text-black mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-black font-medium text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">Password / PIN</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-black font-medium text-base"
              />
            </div>

            {isSignUp && (
              <>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Confirm Password / PIN</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-black font-medium text-base"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label className="text-sm font-medium text-black">
                    I accept the Terms & Conditions
                  </label>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white font-black text-lg rounded-lg hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="mt-4 text-center">
            {isSignUp ? (
              <p className="text-sm text-gray-700">
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="font-bold text-orange-500 hover:underline"
                >
                  Login
                </button>
              </p>
            ) : (
              <p className="text-sm text-gray-700">
                Don't have an account?{" "}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="font-bold text-orange-500 hover:underline"
                >
                  Sign Up
                </button>
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
