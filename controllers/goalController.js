const Goal = require("../models/goal");
const user = require("../models/user");
const User = require("../models/user");

const getGoalById = async (id) => {
  try {
    return await Goal.findById(id);
  } catch (error) {
    return error.message;
  }
};
const addPlayerStat = async (req, res, next) => {
  try {
    const newGoal = new Goal(req.body);
    await newGoal.save();
    res.status(201).json({ goal: newGoal });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTournamentplayerStats = async (req, res, next) => {
  try {
    const forTournament = req.params.forTournament;
    const scorer = req.params.scorer;
    const forTeam = req.params.forTeam;
    const matchId = req.params.matchId;
    const goals = await Goal.findOne({
      scorer: scorer,
      forTournament: forTournament,
      matchId: matchId,
      forTeam: forTeam,
    });
    // If no matches are found, return an empty array
    if (!goals || goals.length === 0) {
      return res.status(200).json({ goals: [] });
    }

    // If matches are found, return them
    res.status(200).json({ goals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTournamentGoals = async (req, res, next) => {
  try {
    const forTournament = req.params.forTournament;
    const forTeam = req.params.forTeam;
    const matchId = req.params.matchId;
    const goals = await Goal.find({
      forTeam: forTeam,
      forTournament: forTournament,
      matchId: matchId,
    });
    // If no matches are found, return an empty array
    if (!goals || goals.length === 0) {
      return res.status(200).json({ goals: [] });
    }

    // If matches are found, return them
    res.status(200).json({ goals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTournamentGoalsWithInfo = async (req, res, next) => {
  try {
    const forTournament = req.params.forTournament;
    const forTeam = req.params.forTeam;
    const matchId = req.params.matchId;
    const goals = await Goal.find({
      forTeam: forTeam,
      forTournament: forTournament,
      matchId: matchId,
    });
    let goalsList = [];
    for (let i = 0; i < goals.length; i++) {
      let goal = {
        _id: goals[i]._id,
        scorer: await user.findById(goals[i].scorer),
        matchId: goals[i].matchId,
        forTeam: goals[i].forTeam,
        forTournament: goals[i].forTournament,
        goalTime: goals[i].goalTime,
        goalNumber: goals[i].goalNumber,
        assistNumber: goals[i].assistNumber,
        yellowCardsNumber: goals[i].yellowCardsNumber,
        redCardsNumber: goals[i].redCardsNumber,
        goalMinutes: goals[i].goalMinutes,
        assistedBy: goals[i].assistedBy,
        yellowCardMinutes: goals[i].yellowCardMinutes,
        RedCardMinutes: goals[i].RedCardMinutes,
      };

      goalsList.push(goal);
    }
    // If no matches are found, return an empty array
    if (!goalsList || goalsList.length === 0) {
      return res.status(200).json({ goalsList });
    }

    // If matches are found, return them
    res.status(200).json({ goalsList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateGoal = async (req, res, next) => {
  try {
    let id = req.params.idGoal;
    const goal = await Goal.findByIdAndUpdate(id, req.body);
    res.status(200).json({ goal });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getGoalById,
  addPlayerStat,
  getTournamentplayerStats,
  updateGoal,
  getTournamentGoals,
  getTournamentGoalsWithInfo,
};
