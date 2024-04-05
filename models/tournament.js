const mongo = require("mongoose");
const Schema = mongo.Schema;
const Tournament = new Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  location: String,
  image: String,
  tournamentType: String,
  nbTeamPartipate: Number,
  country: String,
  state: String,
  city: String,
  fee: { type: Number, default: 0 },
  teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  teamsGroupStage: [
    {
      teamId: { type: Schema.Types.ObjectId, ref: "Team" },
      potNumber: Number,
      groupNumber: Number,
    },
  ],
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  status: String,
});
module.exports = mongo.model("tournament", Tournament);
