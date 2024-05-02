const mongo=require("mongoose")

const Schema=mongo.Schema

const Reservation= new Schema ({

    date:Date,
    nbplace:String,
    prix:Number,
    team1:String,
    team2:String,
    matchId:String,
    
})


module.exports= mongo.model("Reservation",Reservation)
