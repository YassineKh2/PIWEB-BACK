const cron = require('node-cron');
const Stadium = require("../models/stadium");
const Tournament = require("../models/tournament");



const addStadium = async (req, res, next) => {
  try {
    const newStadium = new Stadium(req.body);
    await newStadium.save();
    res.status(201).json({ stadium: newStadium });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStatusBasedOnMaintenance = async () => {
  try {
    // Retrieve all stadiums from the database
    const stadiums = await Stadium.find();

    // Loop through each stadium and update its status based on the maintenance period
    for (const stadium of stadiums) {
      const today = new Date();
      const startDate = new Date(stadium.maintenancePeriod.startDate);
      const endDate = new Date(stadium.maintenancePeriod.endDate);

      console.log('Stadium:', stadium.name);
      console.log('Today:', today);
      console.log('Start Date:', startDate);
      console.log('End Date:', endDate);

      // Compare only the date part (year, month, and day) without considering the time
      const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const startDateDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
      const endDateDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

      // Check if today's date is within the maintenance period
      let status;
      if (todayDate >= startDateDate && todayDate <= endDateDate) {
        // Update the status to 'unavailable'
        status = 'unavailable';
      } else {
        // Update the status to 'available'
        status = 'available';
      }

      console.log('Calculated Status:', status);

      // Update the stadium status
      stadium.status = status;

      // Save the updated stadium to the database
      await stadium.save();
    }

    console.log('Stadium statuses updated successfully');
  } catch (error) {
    console.error('Error updating stadium statuses:', error);
  }
};

// Schedule the status update task to run every day at midnight
cron.schedule('* * * * *', async () => {
  console.log('Running status update task...');
  await updateStatusBasedOnMaintenance();
});


const getAllStadiums = async (req, res, next) => {
  try {
    const Stadiums = await Stadium.find();
    for (let i = 0; i < Stadiums.length; i++) {
      if (!Stadiums || Stadiums.length === 0) {
        throw new Error("Stadiumss not found!");
      }
    }

   
    res.status(200).json({ Stadiums });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStadiumDetails = async (req, res, next) => {
  try {
    const Stadiums = await Stadium.findById(req.params.id);
    if (!Stadiums || Stadiums.length === 0) {
      throw new Error("Stadium not found!");
    }
    res.status(200).json({ Stadiums });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addStadiumsToTournament = async (req, res, next) => {
  try {
    const { tournamentId, stadiumIds } = req.body;

    // Assuming stadiumIds is an array of stadium IDs

    // Update each stadium document with the tournament ID
    await Stadium.updateMany(
      { _id: { $in: stadiumIds } },
      { $push: { tournaments: tournamentId } }
    );

    res.status(200).json({ message: 'Tournament added to stadiums successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkStadiumAvailability = async (req, res) => {
  try {
    const { stadiumId, startDate, endDate } = req.body; // Get stadiumId, startDate, and endDate from request body
    const formattedStartDate = new Date(startDate); // Convert startDate to Date object
    const formattedEndDate = new Date(endDate); // Convert endDate to Date object

    console.log("Checking stadium availability for stadiumId:", stadiumId, "startDate:", formattedStartDate, "endDate:", formattedEndDate); // Add this line

    // Perform availability check using the provided dates
    const overlappingTournaments = await Tournament.find({
      stadiums: stadiumId,
      $or: [
        { startDate: { $lte: formattedEndDate }, endDate: { $gte: formattedStartDate } },
        { startDate: { $gte: formattedStartDate, $lte: formattedEndDate } },
        { endDate: { $gte: formattedStartDate, $lte: formattedEndDate } },
      ],
    });

    console.log("Overlapping tournaments:", overlappingTournaments); // Add this line

    if (overlappingTournaments.length > 0) {
      return res.status(400).json({ message: 'Stadium is not available for the specified dates' });
    }

    res.status(200).json({ message: 'Stadium is available', available: true });
  } catch (error) {
    console.error('Error checking stadium availability:', error);
    res.status(500).json({ message: 'Failed to check stadium availability' });
  }
};


const updateStadium = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStadium = await Stadium.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStadium) {
      return res.status(404).json({ message: 'Stadium not found' });
    }
    res.status(200).json({ stadium: updatedStadium });
  } catch (error) {
    console.error('Error updating stadium:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const deleteStadium = async (req, res) => {
  try {
    const id = req.params.id;
    // Assume StadiumModel is your Mongoose model for stadiums
    const stadium = await Stadium.findByIdAndDelete(id);
    if (!stadium) {
      return res.status(404).json({ message: 'Stadium not found' });
    }
    return res.status(200).json({ message: 'Stadium deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
    addStadium,
    updateStatusBasedOnMaintenance,
    getAllStadiums,
    getStadiumDetails,
    addStadiumsToTournament,
    checkStadiumAvailability,
    updateStadium,
    deleteStadium
  };