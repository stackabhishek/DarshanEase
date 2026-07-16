import { useEffect, useState } from "react";
import api from "../services/api";
import TempleCard from "../components/TempleCard";
import toast from "react-hot-toast";

function Temples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    try {
      const { data } = await api.get("/temples");
      setTemples(data.temples);
    } catch (error) {
      toast.error("Failed to fetch temples");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-orange-500 mb-8">
        Explore Temples
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {temples.map((temple) => (
          <TempleCard
            key={temple._id}
            temple={temple}
          />
        ))}

      </div>

    </div>
  );
}

export default Temples;