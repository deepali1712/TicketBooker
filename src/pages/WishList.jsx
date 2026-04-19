import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function Wishlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setItems(saved);
  }, []);

  const remove = (id) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-8 md:p-16">
      <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>
      {items.length === 0 ? (
        <div className="text-zinc-500">
          Your wishlist is empty. Start hearting some shows!
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item) => (
            <div key={item.id} className="relative group">
              <button
                onClick={() => remove(item.id)}
                className="absolute top-2 right-2 z-10 bg-black/60 p-2 rounded-full text-white hover:bg-red-500 transition"
              >
                <Trash2 size={16} />
              </button>
              <div className="aspect-[2/3] rounded-xl overflow-hidden mb-3">
                <img src={item.img} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold">{item.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
