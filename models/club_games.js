const mongoose = require('mongoose');

// Define the schema for the club_games collection
const clubGamesSchema = new mongoose.Schema({

    _id:{type: Object, required: true,},
    game_id:{type: Number, required: true,},
    club_id:{type: Number, required: true,},
    own_goals:{type: Number, required: true,},
    own_position:{type: Number,},
    own_manager_name:{type: String, required: true,},
    opponent_id:{type: Number, required: true,},
    opponent_goals:{type: Number, required: true,},
    opponent_position:{type: Number,},
    opponent_manager_name:{type: String, required: true,},
    hosting:{type: String, required: true,},
    is_win:{type: Number, required: true,},
});

club_games = mongoose.model('club_games', clubGamesSchema);
module.exports = club_games;