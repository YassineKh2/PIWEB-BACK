const mongo = require("mongoose");
const Schema = mongo.Schema;
const Team = new Schema({
    name: String,
    nameAbbreviation: String,
    foundedIn: Date,
    country: String,
    state: String,
    city: String,
    image: String,
    wins: Number,
    losses: Number,
    draws: Number,
    trophies: [],
    ranking: Number,
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    Managers:[{ type: Schema.Types.ObjectId, ref: 'User' }],
    tournaments: [{ type: Schema.Types.ObjectId, ref: 'Tournament' }]
});
module.exports = mongo.model("team", Team);
