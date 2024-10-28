// controllers/player_valuations.js

const PlayerValuation = require('../models/player_valuations');

const player_valuations = {
    async searchPlayer(id) {
        try {
            const query = { player_id: id };
            return await PlayerValuation.distinct('date').find(query, undefined, undefined)
        } catch (error) {
            console.error('Error fetching player:', error);
            return null;
        }
    }
};

module.exports = player_valuations;
