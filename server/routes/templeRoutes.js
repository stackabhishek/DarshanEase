const express = require("express");
const router = express.Router();

const {
  addTemple,
  getAllTemples,
  getTempleById,
  updateTemple,
  deleteTemple,
} = require("../controllers/templeController");

const { protect, admin } = require("../middleware/authMiddleware");

// Public Routes
router.get("/", getAllTemples);
router.get("/:id", getTempleById);

// Admin Protected Routes
router.post("/", protect, admin, addTemple);
router.put("/:id", protect, admin, updateTemple);
router.delete("/:id", protect, admin, deleteTemple);

module.exports = router;