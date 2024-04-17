import mongoose from "mongoose";
const Schema = mongoose.Schema;

const leaderboardSchema = new Schema({
  gameboard: { type: Schema.Types.ObjectId, ref: "Gameboard", required: true },
  name: { type: String, required: true, minLength: 4, maxLength: 18 },
  score: { type: Schema.Types.Number, min: 0, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Leaderboard", leaderboardSchema);
