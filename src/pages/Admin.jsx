import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Plus,
  LayoutDashboard,
  Ticket,
  IndianRupee,
  Globe,
} from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  // Form State
  const [eventData, setEventData] = useState({
    title: "",
    category: "Movies",
    posterUrl: "",
    basePrice: "",
    vipPrice: "",
    totalSeats: "",
  });

  // Security Guard
  useEffect(() => {
    if (userRole !== "admin") {
      navigate("/");
    }
  }, [userRole, navigate]);

  const handlePublish = async (e) => {
    e.preventDefault();

    // 🚀 BACKEND CONNECTION
    // Tell your teammate this is the object we are sending to her Database
    console.log("Sending to Database:", eventData);

    try {
      const response = await fetch("YOUR_TEAMMATES_BACKEND_URL/api/add-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        alert("Event successfully added to the Database!");
        setEventData({
          title: "",
          category: "Movies",
          posterUrl: "",
          basePrice: "",
          vipPrice: "",
          totalSeats: "",
        });
      }
    } catch (err) {
      alert("Database not connected yet, but form logic is ready!");
    }
  };

  if (userRole !== "admin") return null;

  return (
    <div className="min-h-screen bg-zinc-950 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white flex items-center gap-3">
              <LayoutDashboard className="text-red-500" size={36} />
              Control Panel
            </h1>
            <p className="text-zinc-500 mt-1 uppercase tracking-widest text-xs font-bold">
              Secure Admin Session
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-2xl">
              <p className="text-[10px] text-zinc-500 font-bold uppercase">
                Database Status
              </p>
              <p className="text-green-500 text-sm font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>{" "}
                Connected
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* FORM SECTION */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-zinc-900/40 backdrop-blur-md border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <Plus className="text-red-500" /> Create New Production
              </h2>

              <form className="space-y-6" onSubmit={handlePublish}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
                      Event Title
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-red-500 outline-none transition-all"
                      placeholder="e.g. Inception 2"
                      onChange={(e) =>
                        setEventData({ ...eventData, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
                      Category
                    </label>
                    <select
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-red-500 outline-none transition-all appearance-none"
                      onChange={(e) =>
                        setEventData({ ...eventData, category: e.target.value })
                      }
                    >
                      <option>Movies</option>
                      <option>Sports</option>
                      <option>Plays</option>
                      <option>Stream</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
                    Image Link (Live Database Link)
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      required
                      className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-red-500 outline-none transition-all"
                      placeholder="Paste the Pinterest/Pexels link here"
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          posterUrl: e.target.value,
                        })
                      }
                    />
                    <div className="w-16 h-16 bg-zinc-800 rounded-2xl overflow-hidden border border-white/10">
                      {eventData.posterUrl && (
                        <img
                          src={eventData.posterUrl}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
                      Silver Seat (₹)
                    </label>
                    <input
                      type="number"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-red-500"
                      placeholder="499"
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          basePrice: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
                      Gold Seat (₹)
                    </label>
                    <input
                      type="number"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-red-500"
                      placeholder="999"
                      onChange={(e) =>
                        setEventData({ ...eventData, vipPrice: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
                      Total Capacity
                    </label>
                    <input
                      type="number"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-red-500"
                      placeholder="250"
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          totalSeats: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <button className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-5 rounded-[1.5rem] transition-all shadow-xl shadow-red-600/20 active:scale-[0.98] flex items-center justify-center gap-2">
                  <Globe size={20} /> Deploy to Live Database
                </button>
              </form>
            </div>
          </div>

          {/* STATS SECTION */}
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem]">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-500/10 rounded-2xl text-green-500">
                  <IndianRupee />
                </div>
                <p className="text-zinc-500 font-bold uppercase text-xs">
                  Gross Revenue
                </p>
              </div>
              <h3 className="text-4xl font-black text-white">₹0.00</h3>
              <p className="text-zinc-600 text-xs mt-2">
                Waiting for live bookings...
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem]">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
                  <Ticket />
                </div>
                <p className="text-zinc-500 font-bold uppercase text-xs">
                  Inventory Sold
                </p>
              </div>
              <h3 className="text-4xl font-black text-white">0%</h3>
              <p className="text-zinc-600 text-xs mt-2">
                Update events to start selling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
