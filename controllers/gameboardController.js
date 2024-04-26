import asyncHandler from "express-async-handler";
import Gameboard from "../models/gameboard";
import mongoose from "mongoose";
import Character from "../models/character";

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

const game_move = asyncHandler(async (req, res) => {
  const character = await Character.findById(req.body.character);
  const dbCoordinates = JSON.stringify(character.coordinates);
  const userCoordinates = JSON.stringify(req.body.coordinates);
  const gameboardEqual = String(req.params.id) === String(character.gameboard);
  const coordinatesEqual = dbCoordinates === userCoordinates;

  if (gameboardEqual && coordinatesEqual) {
    res.status(200).json({ message: "You hit the target" });
  } else {
    res.status(400).json({ message: "You missed the target" });
  }
});

export default { gameboards_get, gameboard_get, game_move };
