import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Search,
  ChevronDown,
  Menu,
  User,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export default function Layout() {
  const navigate = useNavigate();

  // Get user info from local storage
  const userRole = localStorage.getItem("userRole");
  const userName = localStorage.getItem("userName");
  const isLoggedIn = !!localStorage.getItem("userToken");

  const handleLogout = () => {
    localStorage.clear(); // Wipe everything (Token, Role, Name)
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col w-full">
      {/* 🔴 TOP NAVBAR */}
      <div className="w-full flex items-center justify-between px-4 md:px-16 py-3 bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
        <div className="flex items-center w-full md:w-2/3 gap-8">
          <Link
            to="/"
            className="text-2xl font-black tracking-tight cursor-pointer"
          >
            Ticket<span className="text-red-500">Booker</span>
          </Link>

          <div className="hidden md:flex flex-1 items-center bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2">
            <Search size={18} className="text-zinc-400 mr-2" />
            <input
              type="text"
              placeholder="Search for Movies, Events, Plays, Sports and Activities"
              className="bg-transparent border-none outline-none w-full text-sm text-white placeholder-zinc-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="hidden md:flex items-center text-sm font-semibold hover:text-red-500 transition">
            Mumbai <ChevronDown size={16} className="ml-1" />
          </button>

          {/* 🔴 DYNAMIC AUTH BUTTON */}
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
                {userRole === "admin" ? (
                  <ShieldCheck size={16} className="text-red-500" />
                ) : (
                  <User size={16} className="text-zinc-400" />
                )}
                <span className="text-xs font-bold truncate max-w-[80px]">
                  {userName || "User"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-zinc-900 rounded-full text-zinc-400 hover:text-red-500 transition"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm font-bold px-6 py-2 rounded-lg transition-all shadow-lg shadow-red-600/20"
            >
              Sign In
            </Link>
          )}

          <Menu
            size={24}
            className="cursor-pointer text-zinc-300 hover:text-white"
          />
        </div>
      </div>

      {/* 🔴 SECONDARY NAVBAR */}
      <div className="w-full bg-zinc-900 border-b border-zinc-800 px-4 md:px-16 py-2 text-sm text-zinc-300 hidden md:flex justify-between items-center">
        <div className="flex gap-6 font-medium">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
          <Link to="/movies" className="hover:text-white transition">
            Movies
          </Link>
          <Link to="/stream" className="hover:text-white transition">
            Stream
          </Link>
          <Link to="/category" className="hover:text-white transition">
            Events
          </Link>
          <Link to="/plays" className="hover:text-white transition">
            Plays
          </Link>
          <Link to="/sports" className="hover:text-white transition">
            Sports
          </Link>
        </div>

        <div className="flex gap-4 text-xs font-medium">
          {/* Show Admin Link ONLY if the logged-in user is an Admin */}
          {userRole === "admin" && (
            <Link
              to="/admin"
              className="text-red-500 font-bold hover:text-red-400 transition animate-pulse"
            >
              GO TO ADMIN DASHBOARD
            </Link>
          )}
          <Link to="#" className="hover:text-white transition">
            Offers
          </Link>
          <Link to="#" className="hover:text-white transition">
            Gift Cards
          </Link>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="flex-1 w-full">
        <Outlet />
      </div>
    </div>
  );
}
