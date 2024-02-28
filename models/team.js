const mongo = require("mongoose");
const Schema = mongo.Schema;
const Team = new Schema({
    name: String,
    nameAbbreviation: String,
    foundedIn: Date,
    country: String,
    state: String,
    city: String,
    wins: Number,
    losses: Number,
    draws: Number,
    trophies: [],
    ranking: Number,
    tournaments: [{ type: Schema.Types.ObjectId, ref: 'Tournament' }]
});
module.exports = mongo.model("team", Team);
