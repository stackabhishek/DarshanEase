import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchBookings();
  }, []);

  const token = localStorage.getItem("token");

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(data.stats);
    } catch (error) {
      toast.error("Failed to load dashboard");
    }
  };

  const fetchBookings = async () => {
    try {
      const { data } = await api.get("/bookings/all-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(data.bookings);
    } catch (error) {
      toast.error("Failed to load bookings");
    }
  };

  const confirmBooking = async (id) => {
    try {
      await api.put(
        `/bookings/confirm/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Booking Confirmed");

      fetchDashboard();
      fetchBookings();

    } catch (error) {
      toast.error("Confirmation Failed");
    }
  };

  if (!stats) {
    return (
      <div className="text-center mt-20 text-2xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-10">

      <h1 className="text-4xl font-bold text-orange-500 mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-12">

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="font-bold text-xl">👥 Users</h2>
          <p className="text-4xl mt-3">{stats.users}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="font-bold text-xl">🛕 Temples</h2>
          <p className="text-4xl mt-3">{stats.temples}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="font-bold text-xl">📖 Bookings</h2>
          <p className="text-4xl mt-3">{stats.bookings}</p>
        </div>

        <div className="bg-green-100 rounded-xl p-6">
          <h2 className="font-bold text-xl">✅ Confirmed</h2>
          <p className="text-4xl mt-3">{stats.confirmed}</p>
        </div>

        <div className="bg-yellow-100 rounded-xl p-6">
          <h2 className="font-bold text-xl">🟡 Pending</h2>
          <p className="text-4xl mt-3">{stats.pending}</p>
        </div>

        <div className="bg-red-100 rounded-xl p-6">
          <h2 className="font-bold text-xl">❌ Cancelled</h2>
          <p className="text-4xl mt-3">{stats.cancelled}</p>
        </div>

      </div>

      <h2 className="text-3xl font-bold mb-6">
        All Bookings
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">

        <table className="w-full">

          <thead className="bg-orange-500 text-white">

            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Temple</th>
              <th className="p-4">Visit Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>

          </thead>

          <tbody>

            {bookings.map((booking) => (

              <tr key={booking._id} className="border-b text-center">

                <td className="p-4">
                  {booking.user?.name}
                </td>

                <td className="p-4">
                  {booking.temple?.name}
                </td>

                <td className="p-4">
                  {new Date(booking.visitDate).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {booking.bookingStatus}
                </td>

                <td className="p-4">

                  {booking.bookingStatus === "Pending" ? (

                    <button
                      onClick={() => confirmBooking(booking._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Confirm
                    </button>

                  ) : (

                    <span className="text-green-600 font-bold">
                      ✓ Done
                    </span>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminDashboard;