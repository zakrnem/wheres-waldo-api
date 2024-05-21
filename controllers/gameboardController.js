import asyncHandler from "express-async-handler";
import Gameboard from "../models/gameboard";
import mongoose from "mongoose";
import Character from "../models/character";
import session from "express-session";
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

const game_move = asyncHandler(async (req, res) => {
  console.log("Gamemove character: ", req.body.character)
  const character = await Character.findById(req.body.character);
  const gameboardEqual = String(req.params.id) === String(character.gameboard);
  const deltaX = Math.abs(
    Number(character.coordinates[0]) - Number(req.body.coordinates[0]),
  );
  const deltaY = Math.abs(
    Number(character.coordinates[1]) - Number(req.body.coordinates[1]),
  );
  const variance = 3;
  const coordinatesMatch = deltaX < variance && deltaY < variance;
  console.log("Gameboard equal ", gameboardEqual, "Coordinates match ", coordinatesMatch)
  const sessionId = req.sessionID;
  if (gameboardEqual && coordinatesMatch) {
    const gameover = save_state(sessionId, req.params.id, req.body.character);
    if (gameover) {
      res.status(201).json({ message: "You won the game" });
    }
    res.status(202).json({ message: "You hit the target" });
  } else if (gameboardEqual) {
    res.status(400).json({ message: "You missed the target", deltaX, deltaY });
  } else {
    res
      .status(401)
      .json({ message: "The gameboard Id doesn't match the session cookie" });
  }
});

let gameState = {};
const save_state = (sessionId, gameboardId, characterId) => {
  if (gameState[sessionId] === undefined) {
    gameState[sessionId] = {
      gameboard: gameboardId,
      character: [characterId],
    };
  } else if (gameState[sessionId].character.length > 2) {
    return true;
  } else {
    console.log("#Prev sucess: ", gameState[sessionId].character.length)
    const alreadyExists = gameState[sessionId].character.find(
      (el) => el === characterId,
    );
    if (!alreadyExists) {
      gameState[sessionId].character.push(characterId);
    }
  }
};

export default { gameboards_get, gameboard_get, game_move };
