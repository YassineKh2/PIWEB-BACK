const mongo = require("mongoose");
const Schema = mongo.Schema;
const Tournament = new Schema({
  name: String,
  description: String,
  image: String,
  startDate: Date,
  endDate: Date,
  Localisation: String,
});
module.exports = mongo.model("tournament", Tournament);
