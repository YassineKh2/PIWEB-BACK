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
      const { startDate, endDate } = stadium.maintenancePeriod;
/*
      console.log('Stadium:', stadium.name);
      console.log('Today:', today);
      console.log('Start Date:', startDate);
      console.log('End Date:', endDate);
*/
      // Check if today's date is within the maintenance period
      let status;
      if (today >= startDate && today <= endDate) {
        // Update the status to 'unavailable'
        status = 'unavailable';
      } else {
        // Update the status to 'available'
        status = 'available';
      }

     // console.log('Calculated Status:', status);

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
cron.schedule('15 * * * *', async () => {
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

module.exports = {
    addStadium,
    updateStatusBasedOnMaintenance,
    getAllStadiums,
    getStadiumDetails
  };