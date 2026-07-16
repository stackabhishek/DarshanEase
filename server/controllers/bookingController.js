const Booking = require("../models/Booking");

// Book Darshan
const createBooking = async (req, res) => {
  try {
    const {
      temple,
      visitDate,
      timeSlot,
      numberOfPersons,
    } = req.body;

    const booking = await Booking.create({
      user: req.user.id,
      temple,
      visitDate,
      timeSlot,
      numberOfPersons,
    });

    res.status(201).json({
      success: true,
      message: "Booking Created Successfully",
      booking,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Get My Bookings
const getMyBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate("temple")
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// Cancel Booking
const cancelBooking = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Only booking owner can cancel
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    booking.bookingStatus = "Cancelled";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking Cancelled Successfully",
      booking,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
 // Admin - Get All Bookings
const getAllBookings = async (req, res) => {
  try {

    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("temple", "name location");

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
// Admin - Confirm Booking
const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.bookingStatus = "Confirmed";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking Confirmed Successfully",
      booking,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking,
  getAllBookings,
  confirmBooking,
};