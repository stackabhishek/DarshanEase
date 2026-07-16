import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const { data } = await api.get("/bookings/my-bookings");
      setBookings(data.bookings);
    } catch {
      toast.error("Failed to load bookings");
    }
  };

  const cancelBooking = async (id) => {
    try {
      const { data } = await api.put(`/bookings/cancel/${id}`);
      toast.success(data.message);
      loadBookings();
    } catch {
      toast.error("Cancellation Failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10">

      <h1 className="text-4xl font-bold text-orange-500 mb-8">
        My Bookings
      </h1>

      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="bg-white shadow rounded-xl p-6 mb-5"
        >

          <h2 className="text-2xl font-bold">
            {booking.temple?.name}
          </h2>

          <p>{booking.temple?.location}</p>

          <p>
            {new Date(booking.visitDate).toLocaleDateString()}
          </p>

          <p>{booking.timeSlot}</p>

          <p>Status: {booking.bookingStatus}</p>

          {booking.bookingStatus !== "Cancelled" && (
            <button
              onClick={() => cancelBooking(booking._id)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Cancel Booking
            </button>
          )}

        </div>
      ))}

    </div>
  );
}

export default MyBookings;