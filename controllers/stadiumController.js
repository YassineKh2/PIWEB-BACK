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

const updateStadiumStatus = async () => {
  try {
    // Retrieve all stadiums from the database
    const stadiums = await Stadium.find();

    // Get today's date
    const today = new Date();
    console.log('Today\'s date:', today);

    // Loop through each stadium
    for (const stadium of stadiums) {
      let status = 'available';

      // Check if today's date is within the maintenance period
      const maintenanceStartDate = new Date(stadium.maintenancePeriod.startDate);
      const maintenanceEndDate = new Date(stadium.maintenancePeriod.endDate);

      if (today >= maintenanceStartDate && today <= maintenanceEndDate) {
        status = 'unavailable due to maintenance';
      } else {
        // Loop through each tournament ID in the stadium
        for (const tournamentId of stadium.tournaments) {
          // Find the tournament document using its ID
          const tournament = await Tournament.findById(tournamentId);

          // If the tournament is not found or it's already ended, continue to the next tournament
          if (!tournament || today > new Date(tournament.endDate)) {
            continue;
          }

          // Check if today's date falls within the tournament period
          if (today >= new Date(tournament.startDate) && today <= new Date(tournament.endDate)) {
            // Update the status to 'unavailable' if a tournament is in process
            status = 'unavailable due to tournament';
            break; // No need to check further tournaments for this stadium
          }
        }
      }

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
// cron.schedule('* * * * *', async () => {
//   console.log('Running status update task based on tournament dates...');
//   await updateStadiumStatus();
// });


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

async function getStadiumsByTournamentId(req, res) {
  const { tournamentId } = req.params; // Extract tournamentId from request parameters

  try {
    // Find stadiums associated with the given tournament ID
    const stadiums = await Stadium.find({ tournaments: tournamentId });
    return res.status(200).json(stadiums);
  } catch (error) {
    console.error('Error fetching stadiums by tournament ID:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteStadiumFromTournament(req, res) {
  const { tournamentId, stadiumId } = req.params;

  try {
    // Find the stadium by ID and update its tournaments array to remove the tournament ID
    const updatedStadium = await Stadium.findByIdAndUpdate(
      stadiumId,
      { $pull: { tournaments: tournamentId } },
      { new: true }
    );

    // Check if the stadium was found and updated successfully
    if (!updatedStadium) {
      return res.status(404).json({ error: 'Stadium not found' });
    }

    // Optionally, you can perform additional actions or send a response indicating success
    return res.status(200).json({ message: 'Stadium deleted from tournament successfully' });
  } catch (error) {
    console.error('Error deleting stadium from tournament:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {
    addStadium,
    updateStadiumStatus,
    getAllStadiums,
    getStadiumDetails,
    addStadiumsToTournament,
    checkStadiumAvailability,
    updateStadium,
    deleteStadium,
    getStadiumsByTournamentId,
    deleteStadiumFromTournament
  };