import express from "express";
const router = express.Router();
import character_controller from "../controllers/characterController";
import gameboard_controller from "../controllers/gameboardController";
import score_controller from "../controllers/scoreController";

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/gameboards", gameboard_controller.gameboards_get);

router.get("/gameboards/:id", gameboard_controller.gameboard_get);

router.get("/characters/:id", character_controller.characters_get);

router.get("/scores/:id", score_controller.scores_get);

export default router;
