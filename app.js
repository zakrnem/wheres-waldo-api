import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import debug from "debug";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

// Setup mongoDB connection
import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const mongoDB = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.URL}`;

main().catch((err) => debug(err));
async function main() {
  await mongoose.connect(mongoDB);
  debug("Connected to MongoDB Atlas");
}

const app = express();

const corsOptions = {
  origin: process.env.FRONT_END_URL,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      name: "session-cookie",
      secure: process.env.NODE_ENV === "production",
      maxAge: process.env.MAX_AGE * 60 * 1000,
    },
  }),
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

import { fileURLToPath } from 'url';

// This gives the current file's path
const __filename = fileURLToPath(import.meta.url);

// This gives the directory name of the current file
const __dirname = path.dirname(__filename);

// Rest of your code
app.use(express.static(path.join(__dirname, "public")));


app.use("/", indexRouter);
app.use("/api/", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
});

export default app;
