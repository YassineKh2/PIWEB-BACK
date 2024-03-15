const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const hotelSchema = new Schema({
    address: {
        countryCode: String,
      },
      chainCode: String,
      distance: {
        unit: String,
        value: Number,
      },
      dupeId: Number,
      geoCode: {
        latitude: Number,
        longitude: Number,
      },
      hotelId: String,
      iataCode: String,
      lastUpdate: Date,
      name: String,
      idTournament: { type: Schema.Types.ObjectId, ref: "Tournament" },
    });

const Hotel = mongoose.model('hotel', hotelSchema);

module.exports = Hotel;
