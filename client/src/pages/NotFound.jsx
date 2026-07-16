import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center">
      <h1 className="text-7xl font-bold text-orange-500">404</h1>

      <p className="text-xl mt-4">
        Page Not Found
      </p>

      <Link
        to="/"
        className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;