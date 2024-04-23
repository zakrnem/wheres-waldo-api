import asyncHandler from "express-async-handler";
import Score from "../models/score";
import mongoose from "mongoose";

const scores_get = asyncHandler(async (req, res) => {
  try {
    const scores = await Score.find({ gameboard: req.params.id }).sort({
      seconds: -1,
    });
    res.status(200).json(scores);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch scores", error: error.message });
  }
});

export default { scores_get };
