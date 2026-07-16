const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    temple: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Temple",
      required: true,
    },

    visitDate: {
      type: Date,
      required: true,
    },

    timeSlot: {
      type: String,
      required: true,
    },

    numberOfPersons: {
      type: Number,
      default: 1,
    },

    bookingStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

console.log("Booking Model Loaded");

module.exports = mongoose.model("Booking", bookingSchema);