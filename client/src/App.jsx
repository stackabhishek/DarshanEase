import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Temples from "./pages/Temples";
import TempleDetails from "./pages/TempleDetails";
import BookTemple from "./pages/BookTemple";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTemples from "./pages/AdminTemples";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-orange-50">

        <Navbar />

        <main className="flex-1">

          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/temples" element={<Temples />} />
            <Route path="/temple/:id" element={<TempleDetails />} />

            {/* User Routes */}
            <Route
              path="/book/:id"
              element={
                <ProtectedRoute>
                  <BookTemple />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/temples"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminTemples />
                </ProtectedRoute>
              }
            />


            {/* 404 */}
            <Route path="*" element={<NotFound />} />

          </Routes>

        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;