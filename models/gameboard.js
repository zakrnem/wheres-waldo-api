import mongoose from "mongoose";
const Schema = mongoose.Schema;

const gameboardSchema = new Schema({
  name: { type: String, required: true, minLength: 5, maxLength: 25 },
  img: { type: String, required: true, minLength: 5, maxLength: 25 },
  createdAt: { type: Date, default: Date.now },
});

gameboardSchema.virtual('characters', {
  ref: 'Character',        
  localField: '_id',       
  foreignField: 'gameboard', 
  justOne: false          
});

gameboardSchema.virtual('leaderboard', {
  ref: 'Score',        
  localField: '_id',       
  foreignField: 'gameboard', 
  justOne: false          
});

export default mongoose.model("Gameboard", gameboardSchema);