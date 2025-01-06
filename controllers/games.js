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
            console.log('matchConditions:', matchConditions);
            return await Games.aggregate([
                { $match: matchConditions },
                {
                    $project: {
                        _id: 0,
                        round: 1,
                        home_club_name: 1,
                        away_club_name: 1,
                        home_club_position: 1,
                        away_club_position: 1
                    }
                },
                {
                    $group: {
                        _id: "$round",
                        teams: {
                            $addToSet: {
                                name: { $cond: { if: { $lt: ["$home_club_position", "$away_club_position"] }, then: "$home_club_name", else: "$away_club_name" } },
                                position: { $cond: { if: { $lt: ["$home_club_position", "$away_club_position"] }, then: "$home_club_position", else: "$away_club_position" } }
                            }
                        }
                    }
                },
                {
                    $addFields: {
                        roundNumber: {
                            $convert: {
                                input: { $arrayElemAt: [{ $split: ["$_id", "."] }, 0] },
                                to: "int",
                                onError: null
                            }
                        }
                    }
                },
                {
                    $sort: { roundNumber: 1 }
                },
                {
                    $project: {
                        _id: 0,
                        round: "$_id",
                        teams: {
                            $sortArray: {
                                input: "$teams",
                                sortBy: { position: 1 }
                            }
                        }
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