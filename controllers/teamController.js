const Team = require("../models/team");
const Match = require("../models/match");
const Tournament = require("../models/tournament");
const User = require("../models/user");
const {getGoalById} = require("./goalController");


const addTeam = async (req, res) => {
    try {

            const newTeam = new Team({
                ...req.body,
                image: req.body.imagename, // Save the filename in the database
            });
            await newTeam.save();
            res.status(201).json({ Team: newTeam });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const teamDetail = async (req, res) => {
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
const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.status(200).json({teams});
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}
const updateTeam = async (req, res) => {
    try {
        let id = req.body._id;
        const team = await Team.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({team});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteTeam = async (req, res) => {
        let id = req.params.id;
        try{
            const team = await Team.findByIdAndDelete(id);
            res.status(200).json({team});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }



const getMatchesByTeam = async (req,res) => {
    let id = req.params.id;
    try {
        const matches = await Match.find({$or: [{idTeam1: id}, {idTeam2: id}]});

        let matchList = [];
        for (let i = 0; i < matches.length; i++) {

            let goalsTeam1Promises = [];
            let goalsTeam2Promises = [];

            if (matches[i].goalsScored.team1.length > 0) {
                matches[i].goalsScored.team1.forEach((goal) => {
                    goalsTeam1Promises.push(getGoalById(goal));
                });
            }

            if (matches[i].goalsScored.team2.length > 0) {
                matches[i].goalsScored.team2.forEach((goal) => {
                    goalsTeam2Promises.push(getGoalById(goal));
                });
            }

            let goalsTeam1 = await Promise.all(goalsTeam1Promises);
            let goalsTeam2 = await Promise.all(goalsTeam2Promises);


            let match = {
                _id: matches[i]._id,
                tournament: await Tournament.findById(matches[i].idTournament),
                team1: await Team.findById(matches[i].idTeam1),
                team2: await Team.findById(matches[i].idTeam2),
                scoreTeam1: matches[i].scoreTeam1,
                scoreTeam2: matches[i].scoreTeam2,
                matchDate: matches[i].matchDate,
                win: matches[i].win,
                loss: matches[i].loss,
                fixture: matches[i].fixture,
                goalsScoredByTeam1: goalsTeam1,
                goalsScoredByTeam2: goalsTeam2,
            }

            matchList.push(match);
        }
        res.status(200).json({matchList});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getTournamentsByTeam = async (req,res) => {
    let TournamentIds = req.body;
    try{
        const Tournaments = await Tournament.find({_id: {$in: TournamentIds}});
        res.status(200).json({Tournaments});
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}


const getTeamByUser = async (req,res) => {
    let id = req.params.id;
    try{
        const team = await Team.find({creator: id});
        res.status(200).json({team});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const getTeam = async (req,res) => {
    let id = req.params.id;
    try{
        const team = await Team.findById(id);
        res.status(200).json({team});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
const getTeams = async (req,res) => {
    let ids = req.body;
    let teams = [];
    try{
        for (const id of ids) {
            const team = await Team.findById(id);
            teams.push(team);
        }
        res.status(200).json(teams);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}

const updateLineup = async (req,res) => {
    let idTeam = req.body.teamid;

    try{
        const team = await Team.findById(idTeam);
        team.currentLineup = req.body.lineup;
        team.save()
        res.status(200).json("Saved Lineup!");
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}
const updateImage = async (req,res) => {
    let idTeam = req.body._id;
    try{
        const team = await Team.findById(idTeam);
        team.image = req.body.imagename;
        team.save()
        res.status(200).json("Image Updated !");
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    addTeam,
    getAllTeams,
    updateTeam,
    deleteTeam,
    teamDetail,
    getMatchesByTeam,
    getTournamentsByTeam,
    getTeamByUser,
    getTeam,
    getTeams,
    updateLineup,
    updateImage
};