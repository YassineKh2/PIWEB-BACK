const mongo = require("mongoose");
const Schema = mongo.Schema;
const Team = new Schema({
    name: String,
    nameAbbreviation: String,
    foundedIn: Date,
    country: String,
    wins: Number,
    losses: Number,
    draws: Number,
    trophies: [],
    ranking: Number,
});
module.exports = mongo.model("team", Team);
