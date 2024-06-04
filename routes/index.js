import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({ message: "Please use the /api/ routes." });
});

export default router;