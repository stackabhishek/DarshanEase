import templeImage from "../assets/image/tirumala.jpg";
import { Link } from "react-router-dom";

function TempleCard({ temple }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">

      <img
  src={templeImage}
  alt={temple.name}
  className="w-full h-56 object-cover"
/>

      <div className="p-5">

        <h2 className="text-2xl font-bold text-orange-500">
          {temple.name}
        </h2>

        <p className="text-gray-600 mt-2">
          📍 {temple.location}
        </p>

        <p className="text-gray-500 mt-2">
          {temple.description}
        </p>

        <div className="mt-5 flex justify-between">

          <Link
            to={`/temple/${temple._id}`}
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            View
          </Link>

          <Link
            to={`/book/${temple._id}`}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Book
          </Link>

        </div>

      </div>

    </div>
  );
}

export default TempleCard;