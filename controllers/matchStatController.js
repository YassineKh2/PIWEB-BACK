const matchStat = require("../models/matchStat");
const addMatchStat = async (req, res, next) => {
  try {
    const newMatchStat = new matchStat(req.body);
    await newMatchStat.save();
    res.status(201).json({ matchStat: newMatchStat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMatcheStats = async (req, res, next) => {
  try {
    const idMatch = req.params.idMatch;
    const matcheStats = await matchStat.findOne({ idMatch });
    if (!matcheStats || matcheStats.length === 0) {
      return res.status(200).json({});
    }
    return res.status(200).json({ matcheStats });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const updateMatchStats = async (req, res, next) => {
  try {
    let idMatch = req.params.idMatch;
    const matchStats = await matchStat.findByIdAndUpdate(idMatch, req.body);
    console.log(matchStats);
    res.status(200).json({ matchStats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  addMatchStat,
  getMatcheStats,
  updateMatchStats,
};
