import asyncHandler from "express-async-handler";
import Character from "../models/character";
import mongoose from "mongoose";

const characters_get = asyncHandler(async (req, res) => {
  try {
    const characters = await Character.find({ gameboard: req.params.id });
    res.status(200).json(characters);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch characters", error: error.message });
  }
});

export default { characters_get };
