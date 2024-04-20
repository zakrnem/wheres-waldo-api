#! /usr/bin/env node

console.log(
  'This script populates some test gameboard characters, users and scores to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://someuser:somepassword@cluster0.mongodb.net/local?retryWrites=true&w=majority"',
);

const userArgs = process.argv.slice(2);

import Character from "../models/character";
import Gameboard from "../models/gameboard";
import Score from "../models/score";
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const mongoDB = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.URL}`;

const characters = [];
const gameboards = [];
const scores = [];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createGameboards();
  await createCharacters();
  await createScores();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function characterCreate(index, name, img, gameboard, coordinates) {
  const newCharacter = {
    name,
    img,
    gameboard,
    coordinates,
  };
  const character = new Character(newCharacter);
  await character.save();
  characters[index] = character;
  console.log(
    `Added character: ${name}, Gameboard: ${gameboard}, Coordinates: ${coordinates}`,
  );
}

async function createCharacters() {
  console.log("Adding characters into gameboard");
  await Promise.all([
    characterCreate(0, "Waldo", "waldo.png", gameboards[0], [50, 50]),
    characterCreate(1, "Wenda", "wenda.png", gameboards[0], [30, 30]),
    characterCreate(2, "Odlaw", "odlaw.png", gameboards[0], [60, 60]),
    characterCreate(0, "Wizard", "wizard.png", gameboards[0], [70, 70]),
  ]);
}

async function gameboardCreate(index, name, img) {
  const newGameboard = {
    name, img,
  }
  const gameboard = new Gameboard(newGameboard)
  await gameboard.save()
  gameboards[index] = gameboard
  console.log(`Added gameboard ${name} with image: ${img}`)
}

async function createGameboards() {
  console.log("Creating gameboards")
  await Promise.all([
    gameboardCreate(0, "downtown", "waldo-downtown.png")
  ])
}

async function scoreCreate (index, gameboard, user, seconds) {
  const newScore = {
    gameboard, user, seconds,
  }
  const score = new Score(newScore)
  await score.save()
  scores[index] = score
  console.log(`Added score for gameboard: ${gameboard}, with username: ${user} and elapsed time: ${seconds}`)
}

async function createScores() {
  console.log("Adding scores")
  await Promise.all([
    scoreCreate(0, gameboards[0], "Test 1", "300"),
    scoreCreate(0, gameboards[0], "Test 2", "180"),
    scoreCreate(0, gameboards[0], "Test 3", "30"),
    scoreCreate(0, gameboards[0], "Test 4", "430")
  ])
}