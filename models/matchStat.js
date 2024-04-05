const mongo = require("mongoose");
const Schema = mongo.Schema;
const MatchStat = new Schema({
  idMatch: { type: Schema.Types.ObjectId, ref: "Match" },
  goalAttemptsTeam1: Number,
  shotsOnGoalTeam1: Number,
  shotsOffGoalTeam1: Number,
  freeKicksTeam1: Number,
  cornerKicksTeam1: Number,
  OffsidesTeam1: Number,
  throwInsTeam1: Number,
  goalkeeperSavesTeam1: Number,
  goalAttemptsTeam2: Number,
  shotsOnGoalTeam2: Number,
  shotsOffGoalTeam2: Number,
  freeKicksTeam2: Number,
  cornerKicksTeam2: Number,
  OffsidesTeam2: Number,
  throwInsTeam2: Number,
  goalkeeperSavesTeam2: Number,
});
module.exports = mongo.model("matchstat", MatchStat);
