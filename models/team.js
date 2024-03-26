const mongo = require("mongoose");
const Schema = mongo.Schema;
const State = {
    PENDING:'PENDING',
    ACCEPTED:'ACCEPTED',
    REFUSED:'REFUSED'
};
const Team = new Schema({
    name: { type: String, default: '' },
    nameAbbreviation: { type: String, default: '' },
    foundedIn: { type: Date, default: Date.now },
    country: { type: String, default: '' },
    founder: { type: String, default: '' },
    state: { type: String, default: '' },
    city: { type: String, default: '' },
    zipcode: { type: Number, default: 0 },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    slogan: { type: String, default: '' },
    nickname: { type: String, default: '' },
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
    currentLineup:[],
});
module.exports = mongo.model("team", Team);
