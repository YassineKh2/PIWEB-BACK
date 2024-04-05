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

const getHotelIds = async (req, res, next) => {
  try {
    const { idTournament } = req.params;
    const addedHotels = await Hotel.find({idTournament }, 'hotelId');
    const addedHotelIds = addedHotels.map((hotel) => hotel.hotelId);
    res.json(addedHotelIds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getHotelsByIdTournament = async (req, res, next) => {
  try {
    const { idTournament } = req.params;
    console.log('idTournament:', idTournament);

    const hotels = await Hotel.find({ idTournament }).exec();
    console.log('hotels:', hotels);

    res.status(200).json({ hotels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const deleteHotelsByTournamentAndCity = async (req, res) => {
  try {
    const { tournamentId,city } = req.params;
    // Delete hotels where tournamentId matches and city matches
    await Hotel.deleteMany({ tournamentId,city });
    res.status(200).json({ message: 'Hotels deleted successfully' });
  } catch (error) {
    console.error('Error deleting hotels:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = { addHotel,getHotelIds,getHotelsByIdTournament,deleteHotelsByTournamentAndCity};
