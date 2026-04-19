import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  // 1. Auto-Slider Data & Logic
  const banners = [
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=2000&q=80",
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // 2. REAL MOVIE POSTER DATA
  const recommendedMovies = [
    {
      id: 101,
      title: "Dune: Part Two",
      genre: "Action/Sci-Fi",
      img: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2JGjjcNsV.jpg",
    },
    {
      id: 102,
      title: "Oppenheimer",
      genre: "Drama/History",
      img: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    },
    {
      id: 103,
      title: "Deadpool & Wolverine",
      genre: "Action/Comedy",
      img: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    },
    {
      id: 104,
      title: "Inside Out 2",
      genre: "Animation/Family",
      img: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzRxqwWECE3.jpg",
    },
    {
      id: 105,
      title: "Interstellar",
      genre: "Sci-Fi/Drama",
      img: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    },
  ];

  const liveEvents = [
    {
      id: 201,
      title: "Arijit Singh Live",
      img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 202,
      title: "Standup Comedy Open Mic",
      img: "https://images.unsplash.com/photo-1527224857830-43a7ebb8545e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 203,
      title: "Pottery Workshop",
      img: "https://images.unsplash.com/photo-1610756086204-1845eb5a1196?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 204,
      title: "Night Flea Market",
      img: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const premieres = [
    {
      id: 301,
      title: "Anatomy of a Fall",
      language: "French",
      img: "https://image.tmdb.org/t/p/w500/kQs6keheMwCxIxrzV83VUwFtHkB.jpg",
    },
    {
      id: 302,
      title: "Past Lives",
      language: "Korean/English",
      img: "https://image.tmdb.org/t/p/w500/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg",
    },
    {
      id: 303,
      title: "Perfect Days",
      language: "Japanese",
      img: "https://image.tmdb.org/t/p/w500/mKtu6iLMJEAqHl2mOqO8fNpn8D1.jpg",
    },
    {
      id: 304,
      title: "The Zone of Interest",
      language: "German",
      img: "https://image.tmdb.org/t/p/w500/hUu9zyZmDd8VZegKi1whKnhVkND.jpg",
    },
    {
      id: 305,
      title: "Poor Things",
      language: "English",
      img: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8PhcbTiQYOMB3vZXG.jpg",
    },
  ];

  return (
    <div className="w-full pb-20 bg-zinc-950 text-white">
      {/* 🔴 1. AUTO-SLIDER HERO CAROUSEL */}
      <div className="w-full py-2 relative overflow-hidden h-[250px] md:h-[400px] bg-zinc-900 cursor-pointer">
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt={`Slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Slider Dots */}
        <div className="absolute bottom-4 w-full flex justify-center gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 🔴 2. RECOMMENDED MOVIES (Standard Portrait Cards) */}
      <div className="w-full px-4 md:px-16 mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recommended Movies</h2>
          <Link
            to="/movies"
            className="text-red-500 text-sm hover:underline flex items-center"
          >
            See All <span className="ml-1">›</span>
          </Link>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x">
          {recommendedMovies.map((movie) => (
            <Link
              to={`/booking/${movie.id}`}
              key={movie.id}
              className="min-w-[180px] max-w-[180px] md:min-w-[220px] md:max-w-[220px] snap-start group"
            >
              <div className="w-full aspect-[2/3] rounded-xl overflow-hidden mb-3">
                <img
                  src={movie.img}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <h3 className="font-semibold text-lg truncate group-hover:text-red-400 transition">
                {movie.title}
              </h3>
              <p className="text-zinc-400 text-sm">{movie.genre}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* 🔴 3. THE BEST OF LIVE EVENTS (Wider Landscape Cards) */}
      <div className="w-full px-4 md:px-16 mt-16">
        <h2 className="text-2xl font-bold mb-6">The Best of Live Events</h2>
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x">
          {liveEvents.map((event) => (
            <Link
              to={`/booking/${event.id}`}
              key={event.id}
              className="min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px] snap-start group"
            >
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 shadow-lg shadow-black/50">
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <h3 className="font-semibold text-lg truncate group-hover:text-red-400 transition">
                {event.title}
              </h3>
              <p className="text-zinc-400 text-sm">Live Event</p>
            </Link>
          ))}
        </div>
      </div>

      {/* 🔴 4. PREMIERE SECTION (Exclusive Dark Blue Background) */}
      <div className="w-full bg-slate-900 mt-20 py-16 px-4 md:px-16">
        <div className="mb-8">
          <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 inline-block rounded mb-2">
            PREMIERE
          </div>
          <h2 className="text-3xl font-bold text-white mb-1">
            Watch new movies at home, every Friday
          </h2>
          <p className="text-slate-400">
            Exclusive releases from around the world.
          </p>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x">
          {premieres.map((movie) => (
            <Link
              to={`/booking/${movie.id}`}
              key={movie.id}
              className="min-w-[180px] max-w-[180px] md:min-w-[220px] md:max-w-[220px] snap-start group"
            >
              <div className="w-full aspect-[2/3] rounded-xl overflow-hidden mb-3">
                <img
                  src={movie.img}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <h3 className="font-semibold text-lg text-white truncate group-hover:text-slate-300 transition">
                {movie.title}
              </h3>
              <p className="text-slate-400 text-sm">{movie.language}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
