import express from "express";
import {
  deleteHotel,
  updateHotel,
  createHotel,
  getHotel,
  getAllHotels,
} from "../controllers/HotelController.js";

const router = express.Router();

// CREATE
router.post("/", createHotel);

// UPDATE
router.put("/:id", updateHotel);

// DELETE
router.delete("/:id", deleteHotel);

// GET
router.get("/:id", getHotel);

// GET ALL
router.get("/", getAllHotels);

export default router;
