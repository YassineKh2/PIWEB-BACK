const mongo = require("mongoose");
const Schema = mongo.Schema;
const State = {
    PENDING:'PENDING',
    ACCEPTED:'ACCEPTED',
    REFUSED:'REFUSED'
};
const Team = new Schema({
    name: String,
    nameAbbreviation: String,
    foundedIn: Date,
    country: String,
    state: String,
    city: String,
    zipcode: Number,
    image: String,
    description: String,
    slogan: String,
    nickname: String,
    wins: { type: Number, default: 0 },
    losses:{ type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    trophies: { type: [], default: [] },
    ranking: { type: Number, default: 1000 },
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    managers:[{ type: Schema.Types.ObjectId, ref: 'User' }],
    tournaments: [{ type: Schema.Types.ObjectId, ref: 'Tournament' }],
    tournamentInvitations:[{
        tournament:{ type: Schema.Types.ObjectId, ref: 'Tournament' },
        date:{ type: Date, default: Date.now },
        state:{ type: String, enum: Object.values(State), default: State.PENDING }
    }],
});
module.exports = mongo.model("team", Team);
