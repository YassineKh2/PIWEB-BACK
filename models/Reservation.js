const mongo=require("mongoose")

const Schema=mongo.Schema

const Reservation= new Schema ({

    date:Date,
    nbplace:String,
    prix:Number,
    match: {
        type: Schema.Types.ObjectId,
        ref: 'match',
        required: true
    }

})


module.exports= mongo.model("Reservation",Reservation)
