const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Avis = new Schema({
    tournament: { type: Schema.Types.ObjectId, ref: 'tournament' },
    user:{ type: Schema.Types.ObjectId, ref: 'user' },
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("avis", Avis);