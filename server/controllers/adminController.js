const User = require("../models/User");
const Temple = require("../models/Temple");
const Booking = require("../models/Booking");

const getDashboardStats = async (req, res) => {
  try {

    const users = await User.countDocuments();
    const temples = await Temple.countDocuments();
    const bookings = await Booking.countDocuments();

    const confirmed = await Booking.countDocuments({
      bookingStatus: "Confirmed",
    });

    const pending = await Booking.countDocuments({
      bookingStatus: "Pending",
    });

    const cancelled = await Booking.countDocuments({
      bookingStatus: "Cancelled",
    });

    res.status(200).json({
      success: true,
      stats: {
        users,
        temples,
        bookings,
        confirmed,
        pending,
        cancelled,
      },
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
  getDashboardStats,
};