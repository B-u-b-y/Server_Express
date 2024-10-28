//controllers/appearances.js

const Appearances = require('../models/appearances');

const appearances = {

    async searchPlayerGames(player_id){
        try{
            const query = {player_id: player_id};
            return await Appearances.distinct('game_id').find(query, undefined, undefined).limit(100);
        }catch(error) {
            console.error('Error fetching player:', error);
            return null;
        }
    }
};



module.exports = appearances;