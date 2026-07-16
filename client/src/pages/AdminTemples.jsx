import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function AdminTemples() {
  const token = localStorage.getItem("token");

  const [temples, setTemples] = useState([]);

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    try {
      const { data } = await api.get("/temples");
      setTemples(data.temples);
    } catch (err) {
      toast.error("Failed to load temples");
    }
  };

  const deleteTemple = async (id) => {
    if (!window.confirm("Delete this temple?")) return;

    try {
      await api.delete(`/temples/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Temple Deleted");

      fetchTemples();

    } catch (err) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-10">

      <h1 className="text-4xl font-bold text-orange-500 mb-8">
        Temple Management
      </h1>

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-orange-500 text-white">

          <tr>
            <th className="p-3">Temple</th>
            <th>Location</th>
            <th>Fee</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {temples.map((temple) => (

            <tr key={temple._id} className="border-b">

              <td className="p-4">{temple.name}</td>

              <td>{temple.location}</td>

              <td>₹{temple.entryFee}</td>

              <td>

                <button
                  onClick={() => deleteTemple(temple._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AdminTemples;