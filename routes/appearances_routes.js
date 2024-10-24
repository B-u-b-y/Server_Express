const express = require('express');
const router = express.Router();
const appearanceController = require('../controllers/appearances');
const { searchAppearancesGame } = require("../controllers/games"); // Ensure axios is imported

router.get('/appearances/games/:player_id', async (req, res) => {
    const { player_id } = req.params;

    try {
        // Fetch the appearances based on player_id
        const appearances = await appearanceController.searchPlayerGames(player_id);

        // If appearances are found, iterate through the appearance_id
        if (appearances && appearances.length > 0) {
            // Initialize an array to store simplified game data
            const gamesData = [];

            // Iterate over each appearance and fetch corresponding game data
            for (const appearance of appearances) {
                const appearance_id = appearance.game_id; // Assuming this is the field containing game_id
                try {
                    // Fetch game data for each appearance_id
                    const gameResponse = await searchAppearancesGame(appearance_id);

                    // Check if gameResponse contains the desired data
                    if (gameResponse && gameResponse.length > 0) {
                        // Assuming gameResponse[0] has the required game data
                        const simplifiedGame = {
                            yellow_cards: appearance.yellow_cards, // Assuming this is the field containing yellow cards
                            red_cards: appearance.red_cards, // Assuming this is the field containing red cards
                            goals: appearance.goals, // Assuming this is the field containing goals
                            assists: appearance.assists, // Assuming this is the field containing assists
                            minutes_played: appearance.minutes_played, // Assuming this is the field containing minutes played
                            competition_id: gameResponse[0].competition_id, // Assuming this is the field containing competition_id
                            season: gameResponse[0].season, // Assuming this is the field containing season
                            date: gameResponse[0].date, // Assuming this is the field containing date
                            home_club_name: gameResponse[0].home_club_name, // Assuming this is the field containing club_id
                            away_club_name: gameResponse[0].away_club_name, // Assuming this is the field containing club_id
                            aggregate: gameResponse[0].aggregate, // Assuming this is the field containing aggregate
                            competition_type: gameResponse[0].competition_type, // Assuming this is the field containing competition_type
                        };

                        // Add the simplified game data to the gamesData array
                        gamesData.push(simplifiedGame);
                    }
                } catch (gameError) {
                    console.error(`Error fetching game for appearance_id ${appearance_id}:`, gameError);
                }
            }

            res.json(gamesData);
        } else {
            res.status(404).json({ error: 'No appearances found for this player.' });
        }

    } catch (error) {
        console.error('Error fetching player games:', error);
        res.status(500).json({ error: 'An error occurred while fetching player data' });
    }
});

module.exports = router;
