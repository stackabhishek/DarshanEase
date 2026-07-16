console.log("Booking Routes Loaded");
const express = require("express");
const router = express.Router();


const {
  createBooking,
  getMyBookings,
  cancelBooking,
  getAllBookings,
  confirmBooking,
} = require("../controllers/bookingController");
const { protect, admin } = require("../middleware/authMiddleware");

// Create Booking
router.post("/", protect, createBooking);

// Get My Bookings
router.get("/my-bookings", protect, getMyBookings);

// Cancel Booking
router.put("/cancel/:id", protect, cancelBooking);

// Get All Bookings (Admin)
router.get("/all-bookings", protect, admin, getAllBookings);

// Confirm Booking (Admin)
router.put("/confirm/:id", protect, admin, confirmBooking); 

module.exports = router;