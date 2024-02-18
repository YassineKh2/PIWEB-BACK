const mongo=require("mongoose")

const Schema=mongo.Schema

const Sponsors= new Schema ({
    name:String,
    domaine:String,
    description:String,
    logo:String,
    contact:Number,
    adresse:String

})


module.exports= mongo.model("sp",Sponsors)
