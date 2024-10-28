//controllers/game_lineups.js

const Game_Lineups = require('../models/game_lineups');

const gameLineups = {

    async searchGameLineups(game_id, team){
        try{
            const query = { game_id: game_id, club_id: team };
            return await Game_Lineups.find(query).limit(10).distinct('game_lineups_id');
        }catch(error) {
            console.error('Error fetching game lineups:', error);
            return null;
        }
    }
};

module.exports = gameLineups;