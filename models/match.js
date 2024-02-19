const mongo = require("mongoose");
const Schema = mongo.Schema;
const Match = new Schema({
  win: String,
  loss: String,
  score: String,
  teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
});
module.exports = mongo.model("match", Match);
