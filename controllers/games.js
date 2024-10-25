//controllers/games.js

const Games = require('../models/games');

const games = {

    async searchAppearancesGame(appearances){
        try{
            const query = {game_id: appearances};
            return await Games.distinct('game_id').find(query, undefined, undefined);
        }catch(error) {
            console.error('Error fetching appearances:', error);
            return null;
        }
    },

    async searchCompetitionGames(competition_id){
        try{
            const query = {competition_id: competition_id};
            return await Games.distinct('game_id').find(query, undefined, undefined).limit(10);
        }catch(error) {
            console.error('Error fetching competition games:', error);
            return null;
        }
    }
};

module.exports = games;