import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Hexagon } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

// ⚠️ MUST MATCH EXACTLY WITH LoginForm.jsx
const ADMIN_EMAIL = "geomancysolutions@gmail.com";

export default function ProtectedRoute({ adminOnly = false }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check if user logged in via local admin bypass
    const localAdmin = localStorage.getItem("admin_bypass");
    if (localAdmin) {
      try {
        const parsed = JSON.parse(localAdmin);
        if (parsed?.email === ADMIN_EMAIL) {
          setUser(parsed);
          setLoading(false);
          return;
        }
      } catch (e) {
        localStorage.removeItem("admin_bypass");
      }
    }

    // 2. Check Supabase active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 3. Listen for real-time auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else if (!localStorage.getItem("admin_bypass")) {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Luxury Gold & Obsidian Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-obsidian-950 text-gold-400">
        <div className="relative flex items-center justify-center">
          <div className="p-3 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-400">
            <Hexagon className="w-10 h-10 animate-spin" />
          </div>
        </div>
        <p className="mt-4 text-xs font-serif tracking-widest text-gold-500/80 uppercase">
          Aligning Grid Parameters...
        </p>
      </div>
    );
  }

  // Redirect to login if unauthenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect non-admin users away from admin-only routes
  if (adminOnly && user.email !== ADMIN_EMAIL) {
    return <Navigate to="/app" replace />;
  }

  // Pure Layout Route: renders nested child routes via Outlet
  return <Outlet />;
}