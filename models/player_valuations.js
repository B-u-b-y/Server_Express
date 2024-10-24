// models/player_valuations.js
const mongoose = require('mongoose');
const moment = require('moment');

// Define the schema for the player_valuations collection
const playerValuationsSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, required: true,},
    player_id: {type: Number, required: true,},
    last_season: {type: Date, required: true, get: (value) => moment(value).format('YYYY-MM-DD')},
    date: {type: Date, required: true, get: (value) => moment(value).format('YYYY-MM-DD')},
    market_value_in_eur: {type: Number, required: true,},
    current_club_id: {type: Number, required: true,},
    player_club_domestic_competition_id: {type: String, required: true,},
});

const player_valuations= mongoose.model('player_valuations', playerValuationsSchema);
module.exports = player_valuations;