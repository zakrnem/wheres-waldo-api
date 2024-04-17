import mongoose from "mongoose";
const Schema = mongoose.Schema;

const gameboardSchema = new Schema({
  name: { type: String, required: true, minLength: 5, maxLength: 25 },
  img: { type: String, required: true, minLength: 5, maxLength: 25 },
  characters: { type: Schema.Types.ObjectId, ref: "Character", required: true },
  leaderboard: {
    type: Schema.Types.ObjectId,
    ref: "Leaderboard",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Gameboard", gameboardSchema);
