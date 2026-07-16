import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function BookTemple() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [temple, setTemple] = useState(null);

  const [form, setForm] = useState({
    visitDate: "",
    timeSlot: "",
    numberOfPersons: 1,
  });

  useEffect(() => {
    loadTemple();
  }, []);

  const loadTemple = async () => {
    const { data } = await api.get(`/temples/${id}`);
    setTemple(data.temple);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/bookings", {
        temple: id,
        ...form,
      });

      toast.success(data.message);
      navigate("/my-bookings");
    } catch (err) {
      toast.error("Booking Failed");
    }
  };

  if (!temple)
    return <h1 className="text-center mt-20">Loading...</h1>;

  return (
    <div className="max-w-xl mx-auto py-10">

      <h1 className="text-3xl font-bold text-orange-500 mb-6">
        {temple.name}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="date"
          className="w-full border p-3 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              visitDate: e.target.value,
            })
          }
          required
        />

        <select
          className="w-full border p-3 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              timeSlot: e.target.value,
            })
          }
          required
        >
          <option value="">Select Slot</option>
          <option>09:00 AM - 10:00 AM</option>
          <option>10:00 AM - 11:00 AM</option>
          <option>11:00 AM - 12:00 PM</option>
        </select>

        <input
          type="number"
          min="1"
          className="w-full border p-3 rounded"
          defaultValue={1}
          onChange={(e) =>
            setForm({
              ...form,
              numberOfPersons: Number(e.target.value),
            })
          }
        />

        <button className="bg-orange-500 text-white px-6 py-3 rounded w-full">
          Book Darshan
        </button>

      </form>

    </div>
  );
}

export default BookTemple;