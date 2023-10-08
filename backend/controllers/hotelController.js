import Hotel from "./../models/Hotel.js";
import createError from "../utils/error.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    // findByIdAndUpdate will update the result but returns the last data not the new one, we need to add {new: true} to see the new result
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted successfully.");
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  const getHotel = await Hotel.findById(req.params.id);
  try {
    res.status(200).json(getHotel);
  } catch (err) {
    next(err);
  }
};

export const getAllHotels = async (req, res, next) => {
  const failed = true;
  if (failed) return next(createError(401, "you are not Authenticated"));

  const hotels = await Hotel.find();
  try {
    res.status(200).json({ count: hotels.length, data: hotels });
  } catch (err) {
    next(err);
  }
};