var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({ message: "Please use the /api/ routes." });
});

module.exports = router;