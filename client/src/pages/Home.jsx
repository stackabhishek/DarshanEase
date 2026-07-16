import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-orange-50 px-6">
      <h1 className="text-5xl font-bold text-orange-600 mb-4">
        🛕 DarshanEase
      </h1>

      <p className="text-lg text-gray-700 text-center max-w-2xl">
        Book temple darshan online easily without standing in long queues.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          to="/temples"
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
        >
          Explore Temples
        </Link>

        <Link
          to="/login"
          className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-500 hover:text-white"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Home;