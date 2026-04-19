import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // 🔴 SECURE ADMIN CREDENTIALS
  const ADMIN_EMAIL = "admin@ticketbooker.com";
  const ADMIN_PASS = "admin123";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Check if the user is attempting Admin Login
    if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASS) {
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("userName", "Master Admin");
      localStorage.setItem("userToken", "secure_admin_session_789");

      alert("Admin Access Granted. Entering Secure Dashboard.");
      navigate("/admin");
      window.location.reload(); // Refresh to update global states
      return;
    }

    // 2. Normal User Flow (Connect to teammate's backend here later)
    console.log("Normal User Auth:", formData);

    // Simulating success for a normal user
    localStorage.setItem("userRole", "user");
    localStorage.setItem("userName", formData.name || "User");
    localStorage.setItem("userToken", "normal_user_session_123");

    navigate("/"); // Take normal user to the main dashboard
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-zinc-950 px-6 py-24 relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full -top-40 -left-20"></div>

      <div className="w-full max-w-[420px] bg-zinc-900/40 backdrop-blur-2xl border border-white/5 p-10 rounded-[2.5rem] shadow-2xl z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold tracking-tight text-white mb-3">
            {isSignup ? "Join Us" : "Welcome Back"}
          </h2>
          <p className="text-zinc-500 text-sm">
            {isSignup
              ? "Create an account to start booking."
              : "Sign in to access your dashboard."}
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {isSignup && (
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-red-500 focus:bg-white/10 outline-none transition-all placeholder:text-zinc-700"
                placeholder="Your Name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-red-500 focus:bg-white/10 outline-none transition-all placeholder:text-zinc-700"
              placeholder="name@email.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-red-500 focus:bg-white/10 outline-none transition-all placeholder:text-zinc-700"
              placeholder="••••••••"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-red-600/20 mt-6 active:scale-[0.98]"
          >
            {isSignup ? "Create Account" : "Sign In"}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-zinc-500 text-sm">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-red-500 font-bold ml-2 hover:text-red-400 transition-colors"
            >
              {isSignup ? "Log In" : "Sign Up Now"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
