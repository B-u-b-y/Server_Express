const mongoose = require('mongoose');

// Define the schema for the game_events collection
const gameEventsSchema = new mongoose.Schema({

    _id:{type: Object, required: true,},
    game_event_id:{type: String, required: true,},
    date:{type: Date, required: true,},
    game_id:{type: Number, required: true,},
    minute:{type: Number, required: true,},
    type:{type: String, required: true,},
    club_id:{type: Number, required: true,},
    player_id:{type: Number, required: true,},
    description:{type: String, required: true,},
    player_in_id:{type: Number, required: true,},
    player_assist_id:{type: Number, required: true,},
});

game_events = mongoose.model('game_events', gameEventsSchema);
module.exports = game_events;