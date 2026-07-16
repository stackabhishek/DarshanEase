console.log("Temple Controller Loaded");
const Temple = require("../models/Temple");
console.log("Temple:", Temple);

// Add Temple
const addTemple = async (req, res) => {
  try {
    const {
      name,
      location,
      description,
      image,
      openingTime,
      closingTime,
      specialDarshan,
      entryFee,
    } = req.body;

    const temple = await Temple.create({
      name,
      location,
      description,
      image,
      openingTime,
      closingTime,
      specialDarshan,
      entryFee,
    });

    res.status(201).json({
      success: true,
      message: "Temple added successfully",
      temple,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Temples
const getAllTemples = async (req, res) => {
  try {
    const temples = await Temple.find();

    res.status(200).json({
      success: true,
      count: temples.length,
      temples,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
  // Get Temple By ID
const getTempleById = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: "Temple not found",
      });
    }

    res.status(200).json({
      success: true,
      temple,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Temple
const updateTemple = async (req, res) => {
  try {
    const temple = await Temple.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
         returnDocument: "after",
         runValidators: true,
      }
    );

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: "Temple not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Temple updated successfully",
      temple,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
  // Delete Temple
const deleteTemple = async (req, res) => {
  try {
    const temple = await Temple.findByIdAndDelete(req.params.id);

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: "Temple not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Temple deleted successfully",
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
  addTemple,
  getAllTemples,
  getTempleById,
  updateTemple,
  deleteTemple,
};