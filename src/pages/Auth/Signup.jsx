
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Loader2,
  User,
  Mail,
  Lock,
  Phone,
  Users,
  Globe,
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

// Escape user-provided values before inserting them into HTML emails.
const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });

export default function SignupForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [preferredLanguage, setPreferredLanguage] =
    useState("English");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (!gender) {
      setErrorMsg("Please select your gender.");
      return;
    }

    setLoading(true);

    try {
      // 1. Create the user's Supabase account.
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullname.trim(),
            phone: phone.trim(),
            gender,
            preferred_language: preferredLanguage,
          },
        },
      });

      if (error) throw error;

      // 2. Send the new registration details to the admin inbox.
      if (data?.user) {
        const safeName = escapeHtml(fullname.trim());
        const safeEmail = escapeHtml(email.trim());
        const safePhone = escapeHtml(phone.trim());
        const safeGender = escapeHtml(gender);
        const safeLanguage = escapeHtml(preferredLanguage);
        const safeUserId = escapeHtml(data.user.id);
        const signupDate = escapeHtml(
          new Date().toLocaleString()
        );

        const { error: notificationError } =
          await supabase.functions.invoke("resend-email", {
            body: {
              // The Edge Function sends to your fixed admin inbox.
              // This email identifies the person who registered.
              email: email.trim(),
              subject: "New Sacred Geomancy Account Registration",
              message: `
                <div style="font-family: Arial, sans-serif; color: #222; line-height: 1.6;">
                  <h2 style="color: #0891b2;">
                    New Account Registration
                  </h2>

                  <p>A new user has registered on Sacred Geomancy Solutions.</p>

                  <table style="border-collapse: collapse; width: 100%;">
                    <tr>
                      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Full Name</strong></td>
                      <td style="padding: 8px; border: 1px solid #ddd;">${safeName}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email Address</strong></td>
                      <td style="padding: 8px; border: 1px solid #ddd;">${safeEmail}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone Number</strong></td>
                      <td style="padding: 8px; border: 1px solid #ddd;">${safePhone}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Gender</strong></td>
                      <td style="padding: 8px; border: 1px solid #ddd;">${safeGender}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Preferred Language</strong></td>
                      <td style="padding: 8px; border: 1px solid #ddd;">${safeLanguage}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px; border: 1px solid #ddd;"><strong>User ID</strong></td>
                      <td style="padding: 8px; border: 1px solid #ddd;">${safeUserId}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Registration Date</strong></td>
                      <td style="padding: 8px; border: 1px solid #ddd;">${signupDate}</td>
                    </tr>
                  </table>

                  <p>This notification was generated when the account signup was submitted.</p>
                </div>
              `,
            },
          });

        if (notificationError) {
          console.error(
            "Admin signup notification failed:",
            notificationError
          );
        }
      }

      // 3. Show the appropriate account creation message.
      if (data?.user && data?.session === null) {
        setSuccessMsg(
          "Account created! Please check your email to confirm, then log in."
        );
      } else {
        setSuccessMsg(
          "Account created successfully! Redirecting to login..."
        );
      }

      // 4. Continue to the login page.
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      console.error("Signup error:", err);
      setErrorMsg(
        err.message ||
          "Unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full p-3 pl-10 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all";

  return (
    <motion.form
      onSubmit={handleSignup}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-white/10 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_0_25px_rgba(255,255,255,0.05)] w-full max-w-md mx-auto space-y-6"
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-green-400 to-purple-400 tracking-tight">
          Create Account
        </h1>
        <p className="text-gray-300 text-sm">
          Register to access your personal dashboard
        </p>
      </div>

      <div className="relative">
        <User
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Full Name"
          autoComplete="name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      <div className="relative">
        <Mail
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="email"
          placeholder="Email Address"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      <div className="relative">
        <Phone
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="tel"
          placeholder="Phone Number (e.g. +2348012345678)"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      <div className="relative">
        <Users
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className={`${inputClass} appearance-none ${
            gender ? "text-white" : "text-gray-400"
          }`}
          required
        >
          <option value="" className="bg-slate-900">
            Select Gender
          </option>
          <option value="Male" className="bg-slate-900 text-white">
            Male
          </option>
          <option value="Female" className="bg-slate-900 text-white">
            Female
          </option>
          <option
            value="Prefer not to say"
            className="bg-slate-900 text-white"
          >
            Prefer not to say
          </option>
        </select>
      </div>

      <div className="relative">
        <Globe
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <select
          value={preferredLanguage}
          onChange={(e) => setPreferredLanguage(e.target.value)}
          className={`${inputClass} appearance-none text-white`}
          required
        >
          <option value="English" className="bg-slate-900 text-white">
            English
          </option>
          <option value="Yorùbá" className="bg-slate-900 text-white">
            Yorùbá
          </option>
        </select>
      </div>

      <div className="relative">
        <Lock
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      <div className="relative">
        <Lock
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      {errorMsg && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400 text-center text-sm"
          role="alert"
        >
          {errorMsg}
        </motion.p>
      )}

      {successMsg && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-400 text-center text-sm font-medium"
          role="status"
        >
          {successMsg}
        </motion.p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-purple-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2" size={18} />
            Creating account...
          </>
        ) : (
          "Sign Up"
        )}
      </button>

      <div className="flex justify-center text-sm text-gray-300 mt-2">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-cyan-300 hover:text-purple-300 transition"
        >
          Already have an account? Log in
        </button>
      </div>
    </motion.form>
  );
}
