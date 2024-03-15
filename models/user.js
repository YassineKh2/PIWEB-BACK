const mongo = require("mongoose");
const Schema = mongo.Schema;

const Role = {
    ADMIN:'A',
    CLIENT:'C',
    TEAMMANAGER:'TM',
    TournamentManager:'TRM',
    PLAYER:'P',
    STAFF:'S'
};

const State = {
    PENDING:'PENDING',
    ACCEPTED:'ACCEPTED',
    REFUSED:'REFUSED'
};
const User = new Schema({


    // -------- Common Attributes --------
    firstName: String,
    lastName:String,
    cin:Number,
    email:String,
    birthDate:{ type: Date, default: Date.now },
    password:String,
    createdAt: { type: Date, default: Date.now },
    role: { type: String, enum: Object.values(Role) },
    image:{type:String , default:"../../../../../../public/images/userImage.png"},
    blocked: { type: Boolean, default: false},
    accountState: { type: String, enum: Object.values(State), default: State.PENDING },
    certificate:{type:String,default:"no certificate"},
    followedTeams:[{ type: Schema.Types.ObjectId, ref: 'Team' }],
    // -------- Common Attributes --------

    // -------- Player Specific Attributes --------
    height:Number,
    position:String,
    goals:Number,
    assists:Number,
    redCards:Number,
    yellowCards:Number,
    state:String,
    preferredFoot:String,
    socialMediaHandle:String,
    PlayingFor:{ type: Schema.Types.ObjectId, ref: 'Team' },
    // -------- Player Specific Attributes --------



    // -------- Staff Specific Attributes --------
    teamsManaged:{ type: Schema.Types.ObjectId, ref: 'Team' },
    staffPosition:String,
    // -------- Staff Specific Attributes --------



    // -------- Tournament Manager Specific Attributes --------
    tournamentsManaged:[{ type: Schema.Types.ObjectId, ref: 'Tournament' }]
    // -------- Tournament Manager Specific Attributes --------



});


User.methods.isBlocked = function () {
    return this.blocked;
};

module.exports = mongo.model("user", User);
