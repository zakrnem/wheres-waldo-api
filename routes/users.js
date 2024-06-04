import express from "express";
const router = express.Router();
import character_controller from "../controllers/characterController.js";
import gameboard_controller from "../controllers/gameboardController.js";
import score_controller from "../controllers/scoreController.js";
import session_controller from "../controllers/sessionController.js";

router.get("/gameboards", gameboard_controller.gameboards_get);

router.get("/gameboards/:id", gameboard_controller.gameboard_get);

router.get("/gameboards/:id/characters", character_controller.characters_get);

router.get("/character/:id", character_controller.character_get);

router.get("/gameboards/:id/scores", score_controller.scores_get);

router.post("/gameboards/:id/scores", score_controller.score_save);

router.post("/gameboards/:id/start", session_controller.start_time);

router.post("/gameboards/:id/current", session_controller.get_time);

router.post("/gameboards/:id/end", session_controller.end_time);

router.post("/gameboards/:id/move/", gameboard_controller.game_move);

router.get("/auth", session_controller.check_auth);

export default router;
