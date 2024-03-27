const Goal = require("../models/goal");
const getGoalById = async (id) => {
    try{
        return await Goal.findById(id)
    }catch(error){
       return error.message
    }
}



module.exports = {getGoalById};