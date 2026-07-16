import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import templeImage from "../assets/image/tirumala.jpg";

function TempleDetails() {
  const { id } = useParams();
  const [temple, setTemple] = useState(null);

  useEffect(() => {
    fetchTemple();
  }, []);

  const fetchTemple = async () => {
    try {
      const { data } = await api.get(`/temples/${id}`);
      setTemple(data.temple);
    } catch (error) {
      toast.error("Failed to load temple");
    }
  };

  if (!temple) {
    return (
      <div className="text-center py-20 text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      <img
  src={temple.image || templeImage}
  alt={temple.name}
  className="w-full h-96 object-cover rounded-xl"
  onError={(e) => {
    e.target.src = templeImage;
  }}
/>
      <h1 className="text-4xl font-bold text-orange-500 mt-6">
        {temple.name}
      </h1>

      <p className="mt-3">📍 {temple.location}</p>

      <p className="mt-5">{temple.description}</p>

      <div className="grid md:grid-cols-2 gap-5 mt-8">

        <div className="bg-orange-100 p-4 rounded">
          <strong>Opening:</strong> {temple.openingTime}
        </div>

        <div className="bg-orange-100 p-4 rounded">
          <strong>Closing:</strong> {temple.closingTime}
        </div>

        <div className="bg-orange-100 p-4 rounded">
          <strong>Entry Fee:</strong> ₹{temple.entryFee}
        </div>

        <div className="bg-orange-100 p-4 rounded">
          <strong>Special Darshan:</strong>{" "}
          {temple.specialDarshan ? "Available" : "Not Available"}
        </div>

      </div>

      <Link
        to={`/book/${temple._id}`}
        className="inline-block mt-8 bg-orange-500 text-white px-6 py-3 rounded-lg"
      >
        Book Darshan
      </Link>

    </div>
  );
}

export default TempleDetails;