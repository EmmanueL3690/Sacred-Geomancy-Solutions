import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function LandingNavbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/20 bg-black/80 backdrop-blur-xl shadow-2xl px-4 sm:px-8 md:px-12 py-4">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
            aria-label="GeomancySolution Home">
              <img
                src="/logo23.jpg"
                alt="GeomancySolution Logo"
                className="h-10 w-10 object-contain rounded-full border-2 border-yellow-400"
              />
            <span className="text-xl md:text-2xl font-semibold text-white whitespace-nowrap">
              <span className="text-yellow-400"> Geomancy Solution</span>
            </span>
          </Link>

          {/* { Desktop Nav } */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link
              to="/"
              className="text-white hover:text-yellow-400 transition-colors font-medium"
            >
              Home
            </Link>

            <Link
              to="/services"
              className="text-white hover:text-yellow-400 transition-colors font-medium"
            >
              Services
            </Link>

            <Link
              to="/contact"
              className="text-white hover:text-yellow-400 transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-all"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-all shadow-lg"
            >
              Signup
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden px-3 py-2 border border-white/30 rounded-lg text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-24 right-4 w-64 bg-black rounded-2xl border border-white/20 shadow-lg p-4 flex flex-col gap-3 md:hidden">
          
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2 rounded-md text-white hover:text-yellow-400 hover:bg-white/5"
          >
            Home
          </Link>

          <Link
            to="/Services"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2 rounded-md text-white hover:text-yellow-400 hover:bg-white/5"
          >
            Services
          </Link>

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2 rounded-md text-white hover:text-yellow-400 hover:bg-white/5"
          >
            Contact
          </Link>

          <hr className="border-white/20 my-2" />

          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/login");
            }}
            className="px-3 py-2 border border-white/30 rounded-md text-white hover:bg-white/10"
          >
            Login
          </button>

          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/signup");
            }}
            className="px-3 py-2 rounded-md bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-all"
          >
            Signup
          </button>
        </div>
      )}
    </header>
  );
}



