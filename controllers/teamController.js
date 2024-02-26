const Team = require("../models/team");

const addTeam = async (req, res, next) => {
    try {
        const newTeam = new Team(req.body);
        newTeam.wins = 0;
        newTeam.losses = 0;
        newTeam.draws = 0;
        newTeam.trophies = [];
        newTeam.ranking = 1000;
        await newTeam.save();
        res.status(201).json({Team: newTeam});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
const teamDetail = async (req, res, next) => {
    try {
      const team = await Team.findById(req.params.id);
      if (!team || team.length === 0) {
        throw new Error("team not found!");
      }
      res.status(200).json({ team });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
const getAllTeams = async (req, res, next) => {
    try {
        const teams = await Team.find();
        res.status(200).json({teams});
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}
const updateTeam = async (req, res, next) => {
    try {
        let id = req.body._id;
        const team = await Team.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({team});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteTeam = async (req, res, next) => {
        let id = req.params.id;
        try{
            const team = await Team.findByIdAndDelete(id);
            res.status(200).json({team});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }


module.exports = {
    addTeam,
    getAllTeams,
    updateTeam,
    deleteTeam,
    teamDetail
};