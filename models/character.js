import mongoose from "mongoose";
const Schema = mongoose.Schema;

const characterSchema = new Schema({
  name: { type: String, required: true, minLength: 5, maxLength: 25 },
  img: { type: String, required: true, minLength: 5, maxLength: 25 },
  gameboard: { type: Schema.Types.ObjectId, ref: "Gameboard", required: true },
  coordinates: { type: Schema.Types.Array, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Character", characterSchema);
