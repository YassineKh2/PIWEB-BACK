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
    cin:{ type: Number, default: "12345678"},
    email:String,
    birthDate:{ type: Date, default: Date.now },
    password:String,
    createdAt: { type: Date, default: Date.now },
    role: { type: String, enum: Object.values(Role) },
    bio:String,
    image:{type:String , default:"public/images/image/userImage.png"},
    blocked: { type: Boolean, default: false},
    accountState: { type: String, enum: Object.values(State), default: State.ACCEPTED },
    certificate:{type:String,default:"no certificate"},
    followedTeams:[{ type: Schema.Types.ObjectId, ref: 'Team' }],
    googleId:{ type: String, default:"no google Id" }, // Google's user ID
    isGoogleAccount: { type: Boolean, default: false }, // Flag for users signed up via Google
    resetCode: { type: String, default: ''},
    resetCodeExpiry: {type: Date,default: Date.now},

    
    teamInvitations:[{
        team:{ type: Schema.Types.ObjectId, ref: 'Team' },
        date:{ type: Date, default: Date.now },
        state:{ type: String, enum: Object.values(State), default: State.PENDING }
    }],
    preferences:{
        TeamInvitations:{ type: Boolean, default: true},
        EmailUpdates:{ type: Boolean, default: true},
    },
    followedTournaments:[{ type: Schema.Types.ObjectId, ref: 'Tournament' }],
    // -------- Common Attributes --------

    // -------- Shared Player And Staff Attributes --------
    previousTeams:[{ type: Schema.Types.ObjectId, ref: 'Team' }],
    PlayingFor:{ type: Schema.Types.ObjectId, ref: 'Team' },
    redCards:{type:Number,default:0},
    yellowCards:{type:Number,default:0},
    position:String,
    jointedTeamDate:{ type: Date, default: Date.now },
    // -------- Shared Player And Staff Attributes --------

    // -------- Player Specific Attributes --------
    height:Number,
    weight:Number,
    goals: {type:Number,default:0},
    assists:{type:Number,default:0},
    HealthStatus:{ type: String, default: "H" },
    preferredFoot:{ type: String, default: "" },
    socialMediaHandle:{ type: String, default: "" },
    teamJerseyNumber:{type:Number,default:0},
    PlayerRating:{type:Number,default:1000},
    // -------- Player Specific Attributes --------



    // -------- Staff Specific Attributes --------


    // -------- Staff Specific Attributes --------



    // -------- Tournament Manager Specific Attributes --------
    tournamentsManaged:[{ type: Schema.Types.ObjectId, ref: 'Tournament' }],
    hasAccessTo :{
        add:{ type: Boolean, default: false},
        kick:{ type: Boolean, default: false},
        editlineup:{ type: Boolean, default: false},
    }
    // -------- Tournament Manager Specific Attributes --------

});


User.methods.isBlocked = function () {
    return this.blocked;
};

module.exports = mongo.model("user", User);
