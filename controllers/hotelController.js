// Example: backend/controllers/hotelController.js
const Hotel = require('../models/hotel');

const addHotel = async (req, res) => {
  try {
    const hotelsToAdd = req.body; // Assuming the request body contains an array of hotels

    // Check if any of the hotels already exist with the same hotelId and idTournament
    const existingHotels = await Hotel.find({
      $or: hotelsToAdd.map((hotel) => ({
        hotelId: hotel.hotelId,
        idTournament: hotel.idTournament,
      })),
    });

    if (existingHotels.length > 0) {
      // Some hotels already exist, send an error response
      res.status(400).json({ message: 'Some hotels already exist with the same hotelId and idTournament.' });
      return;
    }

    // If no hotels already exist, proceed with adding them to the database
    const createdHotels = await Hotel.insertMany(hotelsToAdd);
    res.status(201).json({ hotels: createdHotels });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addHotel };
