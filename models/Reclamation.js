const mongo = require("mongoose");
const User = require("./user");
const Schema = mongo.Schema;
const Type = {
    TICKET:'T',
    HOTEL:'H',
    BUS:'B'
};
const Reclamation = new Schema({
    name: String,
    type:{ type: String, enum: Object.values(Type), default: Type.TICKET},
    createdAt: { type: Date, default: Date.now },
    purpose:String,
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    product:Object
});
module.exports = mongo.model("reclamation", Reclamation);