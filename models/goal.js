const mongo = require("mongoose");
const Schema = mongo.Schema;
const Goal = new Schema({
  scorer: { type: Schema.Types.ObjectId, ref: "User" },
  assistedBy: { type: Schema.Types.ObjectId, ref: "User" },
  matchId: { type: Schema.Types.ObjectId, ref: "Match" },
  forTeam: { type: Schema.Types.ObjectId, ref: "Team" },
  forTournament: { type: Schema.Types.ObjectId, ref: "Tournament" },
  goalTime: Date,
  goalNumber: Number,
  assistNumber: Number,
  yellowCardsNumber: Number,
  redCardsNumber: Number,
  goalMinutes: [Number],
  yellowCardMinutes: Number,
  RedCardMinutes: Number,
});
module.exports = mongo.model("goal", Goal);
