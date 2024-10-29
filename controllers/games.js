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

    async searchCompetitionGames(competition_id) {
        try {
            const query = {competition_id: competition_id};
            return await Games.distinct('game_id').find(query, undefined, undefined).limit(10);
        } catch (error) {
            console.error('Error fetching competition games:', error);
            return null;
        }
    },

    async searchCompetitionStandings(competition_id) {
        try {
            const matchConditions = { competition_id, season: 2023 };

            return await Games.aggregate([
                { $match: matchConditions },
                {
                    $project: {
                        _id: 0,
                        round: 1,
                        teams: [
                            {
                                name: "$home_club_name",
                                position: "$home_club_position",
                                side: "home"
                            },
                            {
                                name: "$away_club_name",
                                position: "$away_club_position",
                                side: "away"
                            }
                        ]
                    }
                },
                { $unwind: "$teams" },
                {
                    $group: {
                        _id: "$round",
                        teams: { $addToSet: "$teams" }
                    }
                },
                {
                    // Add a field to extract the numeric part of the round for sorting
                    $addFields: {
                        roundNumber: { $toInt: { $arrayElemAt: [{ $split: ["$_id", "."] }, 0] } }
                    }
                },
                {
                    // Sort by the extracted round number
                    $sort: { roundNumber: 1 }
                },
                {
                    // Optional: Remove the roundNumber field from the final output
                    $project: {
                        _id: 0,
                        round: "$_id",
                        teams: { $sortArray: { input: "$teams", sortBy: { position: 1 } } }
                    }
                }
            ]);
        } catch (error) {
            console.error('Error fetching standings:', error);
            return null;
        }
    }
};

module.exports = games;