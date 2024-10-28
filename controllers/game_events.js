//controllers/game_events.js

const Game_Events = require('../models/game_events');

const game_events = {

            async searchGameEvents(game_id){
                try{
                    const query = {game_id: game_id};
                    return await Game_Events.distinct('game_event_id').find(query, undefined, undefined).limit(20);
                }catch(error) {
                    console.error('Error fetching game events:', error);
                    return null;
                }
            }
};





module.exports = game_events;




