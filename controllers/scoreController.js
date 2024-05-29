import asyncHandler from "express-async-handler";
import Score from "../models/score";
import mongoose from "mongoose";
import { format } from "date-fns";

const scores_get = asyncHandler(async (req, res) => {
  try {
    const scores = await Score.find({ gameboard: req.params.id }).sort({
      seconds: -1,
    });
    for (const key of Object.keys(scores)) {
      const parsedDate = new Date(scores[key].date);
      const date = format(parsedDate, "MM-dd-yyyy");
      scores[key] = {
        user: scores[key].user,
        date,
        seconds: scores[key].seconds,
      };
    }
    res.status(200).json(scores);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch scores", error: error.message });
  }
});

const score_save = asyncHandler(async (req, res) => {
  const newScore = {
    gameboard: req.params.id,
    user: req.body.user,
    seconds: req.body.time,
  }

  try {
    const score = new Score(newScore);
    await score.save();
    res.status(200).json({ newScore });
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

export default { scores_get, score_save };