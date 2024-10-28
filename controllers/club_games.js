//controllers/club_games_router.js

const Club_Games = require('../models/club_games');

const club_games = {

        async searchClubGames(club_id){
            try{
                const query = {club_id: club_id};
                return await Club_Games.distinct('game_id').find(query, undefined, undefined).limit(10);
            }catch(error) {
                console.error('Error fetching club games:', error);
                return null;
            }
        }
};

module.exports = club_games;
