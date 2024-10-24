//controllers/games.js

const Games = require('../models/games');

const games = {

    async searchAppearancesGame(appearances){
        console.log('Searching for appearances:', appearances);
        try{
            const query = {game_id: appearances};
            return await Games.distinct('game_id').find(query, undefined, undefined).limit(10);
        }catch(error) {
            console.error('Error fetching appearances:', error);
            return null;
        }
    }

};

module.exports = games;