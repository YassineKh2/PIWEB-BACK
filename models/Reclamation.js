const mongo = require("mongoose");
const User = require("./user");
const Schema = mongo.Schema;
const Type = {
    TICKET:'TICKET',
    HOTEL:'HOTEL',
    BUS:'BUS',
    MATCH:'MATCH'
};
const Status = {
    PENDING:'PENDING',
    APPROVED:'APPROVED',
    REJECTED:'REJECTED'

};
const Reclamation = new Schema({
    name: String,
    status:{ type: String, enum: Object.values(Status), default: Status.PENDING},
    type:{ type: String, enum: Object.values(Type), default: Type.TICKET},
    createdAt: { type: Date, default: Date.now },
    purpose:String,
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    product:Object
});
module.exports = mongo.model("reclamation", Reclamation);