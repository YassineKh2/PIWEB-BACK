const mongo = require("mongoose");
const Schema = mongo.Schema;

const Role = {
    ADMIN:'A',
    CLIENT:'C',
    TEAMMANAGER:'TM',
    TournamentManager:'TRM'
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
    role: { type: String, enum: Object.values(Role), default: Role.CLIENT },
    image:{type:String , default:"../../../../../../public/images/userImage.png"},
    followedTeams:[{ type: Schema.Types.ObjectId, ref: 'Team' }],
    // -------- Common Attributes --------

    // -------- Player Specific Attributes --------
    Height:Number,
    Position:String,
    Goals:Number,
    Assists:Number,
    RedCards:Number,
    YellowCards:Number,
    State:String,
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


module.exports = mongo.model("user", User);
