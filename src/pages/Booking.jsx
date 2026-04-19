import { useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Booking() {
  const { id } = useParams(); // Gets the event ID from the URL

  // 1. GENERATE MOCK SEATS
  // We are creating rows A to F, with 8 seats per row.
  const rowLabels = ["A", "B", "C", "D", "E", "F"];
  const mockSeatLayout = rowLabels.map((row) => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: `${row}${i + 1}`,
      row: row,
      number: i + 1,
      // Randomly book ~30% of seats for testing
      status: Math.random() > 0.7 ? "Booked" : "Available",
      price: row === "A" || row === "B" ? 250 : 150, // Premium price for back rows
    }));
  });

  // 2. STATE MANAGEMENT
  const [selectedSeats, setSelectedSeats] = useState([]);

  // 3. SEAT CLICK LOGIC
  const handleSeatClick = (seat) => {
    if (seat.status === "Booked") return; // Do nothing if it's already taken

    const isAlreadySelected = selectedSeats.find((s) => s.id === seat.id);

    if (isAlreadySelected) {
      // Un-select the seat
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else {
      // Select the seat
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // Calculate total price based on selected seats
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col w-full relative pb-32">
      {/* Edge-to-Edge Header */}
      <div className="w-full bg-zinc-900 px-4 md:px-16 py-4 flex justify-between items-center border-b border-zinc-800 sticky top-0 z-50">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Event #{id} Seating
          </h1>
          <p className="text-zinc-400 text-sm md:text-base">
            Select your preferred seats
          </p>
        </div>
        <Link
          to="/"
          className="text-red-500 hover:text-red-400 text-sm md:text-base font-semibold px-4 py-2 border border-red-500 rounded hover:bg-red-500/10 transition"
        >
          Cancel
        </Link>
      </div>

      {/* Massive Screen Area */}
      <div className="w-full mt-10 mb-16 flex flex-col items-center px-4">
        <div className="w-[90%] md:w-[70%] h-4 bg-gradient-to-b from-blue-500 to-transparent rounded-t-[100%] opacity-50 blur-md"></div>
        <div className="w-[90%] md:w-[70%] h-12 border-t-4 border-blue-400 rounded-t-[50%] flex items-center justify-center text-sm md:text-lg text-blue-400 uppercase tracking-[0.3em] md:tracking-[0.5em] mt-1 shadow-[0_-10px_30px_rgba(59,130,246,0.2)]">
          Stage / Screen
        </div>
      </div>

      {/* Centered, Spaced-out Seat Grid */}
      <div className="flex-1 flex flex-col items-center w-full px-4 overflow-x-auto">
        <div className="flex flex-col gap-4 md:gap-6 min-w-max pb-10">
          {mockSeatLayout.map((rowArr, rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-4 md:gap-6">
              {/* Left Row Label */}
              <div className="w-6 md:w-8 text-right font-bold text-zinc-500 text-base md:text-lg">
                {rowArr[0].row}
              </div>

              {/* The Seats */}
              <div className="flex gap-2 md:gap-3">
                {rowArr.map((seat) => {
                  const isSelected = selectedSeats.find(
                    (s) => s.id === seat.id,
                  );

                  // Tailwind v4 styling logic
                  let baseStyles =
                    "w-8 h-8 md:w-12 md:h-12 rounded-t-lg md:rounded-t-xl text-xs md:text-sm font-bold transition-all duration-200 flex items-center justify-center border-b-[3px] md:border-b-4";

                  let colorStyles =
                    seat.status === "Booked"
                      ? "bg-zinc-800 border-zinc-900 text-zinc-600 cursor-not-allowed"
                      : isSelected
                        ? "bg-green-500 border-green-700 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)] scale-110"
                        : "bg-zinc-700 border-zinc-800 text-zinc-300 hover:bg-green-500/20 hover:border-green-500 cursor-pointer";

                  return (
                    <button
                      key={seat.id}
                      disabled={seat.status === "Booked"}
                      onClick={() => handleSeatClick(seat)}
                      className={`${baseStyles} ${colorStyles}`}
                    >
                      {seat.number}
                    </button>
                  );
                })}
              </div>

              {/* Right Row Label */}
              <div className="w-6 md:w-8 text-left font-bold text-zinc-500 text-base md:text-lg">
                {rowArr[0].row}
              </div>
            </div>
          ))}
        </div>

        {/* LEGEND */}
        <div className="flex gap-6 mt-8 mb-12 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border border-zinc-500 bg-zinc-700 rounded-t"></div>{" "}
            Available
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-t"></div> Selected
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-zinc-800 rounded-t"></div> Sold
          </div>
        </div>
      </div>

      {/* CHECKOUT BAR (Slides up when seats are selected) */}
      {selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-zinc-900 border-t border-zinc-800 p-4 md:p-6 flex justify-center shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50">
          <div className="w-full max-w-4xl flex justify-between items-center">
            <div>
              <div className="text-zinc-400 text-sm">
                {selectedSeats.length} Tickets Selected
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white">
                ₹{totalPrice}
              </div>
            </div>
            <button
              onClick={() =>
                alert(
                  `Sending to backend: ${selectedSeats.map((s) => s.id).join(", ")}`,
                )
              }
              className="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-lg font-bold text-white transition shadow-lg hover:shadow-red-500/20"
            >
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
