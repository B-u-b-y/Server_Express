const mongoose = require('mongoose');
const moment = require("moment/moment");

// Define the schema for the games collection
const gamesSchema = new mongoose.Schema({

    _id:{type: Object, required: true,},
    game_id:{type: Number, required: true,},
    competition_id:{type: String, required: true,},
    season:{type: Number, required: true,},
    round:{type: String, required: true,},
    date:{type: Date, required: true, get: (value) => moment(value).format('YYYY-MM-DD')},
    home_club_id:{type: Number, required: true,},
    away_club_id:{type: Number, required: true,},
    home_club_goals:{type: Number, required: true,},
    away_club_goals:{type: Number, required: true,},
    home_club_position:{type: Number,},
    away_club_position:{type: Number,},
    home_club_manager_name:{type: String, required: true,},
    away_club_manager_name:{type: String, required: true,},
    stadium:{type: String, required: true,},
    attendance:{type: Number, required: true,},
    referee:{type: String, required: true,},
    home_club_formation:{type: String, required: true,},
    away_club_formation:{type: String, required: true,},
    home_club_name:{type: String, required: true,},
    away_club_name:{type: String, required: true,},
    aggregate:{type: String, required: true,},
    competition_type:{type: String, required: true,},
    country:{type: String,},
});

games = mongoose.model('games', gamesSchema);
module.exports = games;