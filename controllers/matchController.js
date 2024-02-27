const match = require("../models/match");

const addMatch = async (req, res, next) => {
  try {
    const newMatch = new match(req.body);
    await newMatch.save();
    res.status(201).json({ match: newMatch });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; /*
const getTournamentMatches = async (req, res, next) => {
  try {
    const tournamentId = req.params.idTournament;
    console.log(tournamentId)
    const matches = await match.find({ tournamentId });
    console.log(matches);
    if (!matches || matches.length === 0) {
      throw new Error("tournament not found!");
    }
    res.status(200).json({ matches });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};*/
module.exports = {
  addMatch,
  // getTournamentMatches,
};
