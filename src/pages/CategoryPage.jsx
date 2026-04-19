import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

export default function CategoryPage() {
  const location = useLocation();

  // 1. Get the category name from the URL (e.g., /movies -> MOVIES)
  const categoryPath = location.pathname.replace("/", "");
  const categoryName = categoryPath.toUpperCase() || "EVENTS";

  // 2. Data Store for different Dashboards
  const dashboardData = {
    movies: [
      {
        id: 101,
        title: "Dune: Part Two",
        price: "₹250 onwards",
        img: "https://i.pinimg.com/564x/41/00/03/410003056a048ed38258380e2264c760.jpg",
        tag: "Blockbuster",
      },
      {
        id: 102,
        title: "Oppenheimer",
        price: "₹300 onwards",
        img: "https://i.pinimg.com/564x/24/66/1b/24661b369527e02df3594f877d901614.jpg",
        tag: "Must Watch",
      },
    ],
    sports: [
      {
        id: 401,
        title: "IPL 2026: MI vs CSK",
        price: "₹1500 onwards",
        img: "https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=600",
        tag: "Fast Filling",
      },
      {
        id: 402,
        title: "Pro Kabaddi League",
        price: "₹400 onwards",
        img: "https://images.pexels.com/photos/2081152/pexels-photo-2081152.jpeg?auto=compress&cs=tinysrgb&w=600",
        tag: "Popular",
      },
    ],
    plays: [
      {
        id: 501,
        title: "Hamlet: Dark Prince",
        price: "₹600 onwards",
        img: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=600",
        tag: "Classic",
      },
      {
        id: 502,
        title: "Mughal-E-Azam",
        price: "₹1200 onwards",
        img: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600",
        tag: "Grand",
      },
    ],
    category: [
      // This is for the "Events" link
      {
        id: 201,
        title: "Art & Pottery Workshop",
        price: "₹499",
        img: "https://images.pexels.com/photos/4554211/pexels-photo-4554211.jpeg?auto=compress&cs=tinysrgb&w=600",
        tag: "Workshop",
      },
      {
        id: 202,
        title: "Zakir Khan Standup",
        price: "₹799",
        img: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=600",
        tag: "Comedy",
      },
    ],
  };

  // 3. Select the correct list based on URL, or default to general events
  const currentItems = dashboardData[categoryPath] || dashboardData["category"];

  return (
    <div className="min-h-screen bg-zinc-950 p-4 md:px-16 md:py-10">
      {/* Header Area */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
          <Link to="/" className="hover:text-red-500">
            Home
          </Link>
          <span>/</span>
          <span className="text-zinc-300 capitalize">{categoryPath}</span>
        </div>
        <h1 className="text-4xl font-bold">{categoryName} in Mumbai</h1>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {currentItems.map((item) => (
          <Link
            to={`/booking/${item.id}`}
            key={item.id}
            className="group flex flex-col"
          >
            <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-zinc-900 mb-4">
              {/* Watchlist Heart Button */}
              <button className="absolute top-3 right-3 z-10 p-2 bg-black/40 backdrop-blur-md rounded-full hover:bg-red-500 transition-all group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="white"
                  viewBox="0 0 256 256"
                >
                  <path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40Z"></path>
                </svg>
              </button>

              {item.tag && (
                <div className="absolute bottom-3 left-3 bg-red-600 text-[10px] font-bold px-2 py-1 rounded text-white z-10">
                  {item.tag}
                </div>
              )}

              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/400x600/18181b/ffffff?text=Image+Blocked";
                }}
              />
            </div>

            <h3 className="font-bold text-lg group-hover:text-red-500 transition-colors truncate">
              {item.title}
            </h3>
            <p className="text-zinc-400 text-sm">{item.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
