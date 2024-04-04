const mongo = require("mongoose");
const Schema = mongo.Schema;

const Role = {
    
    TEAMMANAGER:'TM',
    TournamentManager:'TRM',
  
};

const State = {
    PENDING:'PENDING',
    ACCEPTED:'ACCEPTED',
    REFUSED:'REFUSED'
};

const Waitlist = new Schema({


   
    firstName: String,
    lastName:String,
    cin:Number,
    email:String,
    role: { type: String, enum: Object.values(Role) },
    birthDate:{ type: Date, default: Date.now },
    password:String,
    createdAt: { type: Date, default: Date.now },
    accountState: { type: String, enum: Object.values(State), default: State.PENDING },
    certificate:{type:String,default:"no certificate"},
    resetCode: { type: String, default: ''},
    resetCodeExpiry: {type: Date,default: Date.now},
  
});
module.exports = mongo.model("waitlist", Waitlist);
