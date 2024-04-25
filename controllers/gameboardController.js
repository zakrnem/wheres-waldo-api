import asyncHandler from "express-async-handler";
import Gameboard from "../models/gameboard";
import mongoose from "mongoose";
import character from "../models/character";

const gameboards_get = asyncHandler(async (req, res) => {
  try {
    const gameboards = await Gameboard.find();
    res.status(200).json(gameboards);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch gameboards", error: error.message });
  }
});

const gameboard_get = asyncHandler(async (req, res) => {
  try {
    const gameboard = await Gameboard.findById(req.params.id)
      .populate("leaderboard")
      .populate("characters");
    const resObj = {
      _id: gameboard._id,
      name: gameboard.name,
      img: gameboard.img,
      createdAt: gameboard.createdAt,
      leaderboard: gameboard.leaderboard,
      characters: gameboard.characters,
    };
    res.status(200).json(resObj);
  } catch (error) {
    res.status(500).json({
      message: `Failed to fetch gameboard with Id: ${req.params.id}`,
      error: error.message,
    });
  }
});

export default { gameboards_get, gameboard_get };
