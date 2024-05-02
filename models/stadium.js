const mongo = require("mongoose");
const Schema = mongo.Schema; 
const Stadium = new Schema({
    name: { type: String, required: true },
    ownership: String ,

   
    address: {
      city: String ,
      state: String ,
      country: String , 
      street: String,
      postcode:Number,

    },
      
    capacity: Number ,
    maintenancePeriod: {
      startDate: Date,
      endDate: Date
    },
    bookingSchedule: String,   
    status:String,
    tournaments: [{ type: Schema.Types.ObjectId, ref: 'Tournament' }]


  });
    

  module.exports = mongo.model("stadium", Stadium, "stadium");
