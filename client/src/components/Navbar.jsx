import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-orange-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-white text-3xl font-bold tracking-wide"
        >
          🚩 DarshanEase
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-white font-medium">

          <Link
            to="/"
            className="hover:text-yellow-200 transition"
          >
            Home
          </Link>

          <Link
            to="/temples"
            className="hover:text-yellow-200 transition"
          >
            Temples
          </Link>

          {user && (
            <Link
              to="/my-bookings"
              className="hover:text-yellow-200 transition"
            >
              My Bookings
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="hover:text-yellow-200 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-orange-100 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;