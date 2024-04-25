import asyncHandler from "express-async-handler";

const check_auth = asyncHandler(async (req, res) => {
  const isAuthenticated = !!req.session.timeStart;
  res.status(200).json({ auth: isAuthenticated, session: req.session });
});

const start_time = asyncHandler(async (req, res) => {
  const maxAge = process.env.MAX_AGE;
  if (req.session.timeStart) {
    res.status(400).json({ message: "Timer already started" });
  } else {
    req.session.timeStart = Date.now();
    res.cookie("session-cookie", req.sessionID, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: false,
      maxAge: maxAge * 60 * 1000,
    });
    res.status(200).json({ message: `Timer started sucesfully` });
  }
});

const end_time = asyncHandler(async (req, res) => {
  if (!req.session.timeStart) {
    res.status(400).json({ message: "Timer not started" });
  } else {
    const elapsedTime = (Date.now() - req.session.timeStart) / 1000
    req.session.destroy();
    res.clearCookie("session-cookie");
    res.status(200).send({ message: `Elapsed time: ${elapsedTime} seconds`, time: elapsedTime });
  }
});

export default { check_auth, start_time, end_time };
