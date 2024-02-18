const mongo=require("mongoose")

const Schema=mongo.Schema

const Reservation= new Schema ({

    date:Date,
    nbplace:Number,
    prix:Number,

})


module.exports= mongo.model("reservation",Reservation)
