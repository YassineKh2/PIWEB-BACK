const mongo = require("mongoose");
const Schema = mongo.Schema;

const Role = {
    ADMIN:'A',
    CLIENT:'C',
    TEAMMANAGER:'TM',
    TournamentManager:'TRM'
};
const User = new Schema({

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



});
module.exports = mongo.model("user", User);
