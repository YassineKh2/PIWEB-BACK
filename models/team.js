const mongo = require("mongoose");
const Schema = mongo.Schema;

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
    capital:Number,
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    trophies: { type: [], default: [] },
    ranking: { type: Number, default: 1000 },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    managers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    tournaments: [{ type: Schema.Types.ObjectId, ref: 'Tournament' }],
    sponsors: [{
        name:String,
        description:String,
        logo:String,
        contact:Number,
        adresse:String,
     
    }]
});

module.exports = mongo.model("team", Team);
