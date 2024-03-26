const mongo = require("mongoose");
const Schema = mongo.Schema;
const Match = new Schema({
    win: String,
    loss: String,
    scoreTeam1: String,
    scoreTeam2: String,
    matchDate: Date,
    fixture: String,
    nextMatchId: String,
    idTeam1: {type: Schema.Types.ObjectId, ref: "Team"},
    idTeam2: {type: Schema.Types.ObjectId, ref: "Team"},
    idTournament: {type: Schema.Types.ObjectId, ref: "Tournament"},
    goalsScored: {
        type: {
            team1: [{type: Schema.Types.ObjectId, ref: "Goal"}],
            team2: [{type: Schema.Types.ObjectId, ref: "Goal"}]
        }
        , default: {team1: [], team2: []}
    },
});
module.exports = mongo.model("match", Match);
