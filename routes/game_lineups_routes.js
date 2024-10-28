const express = require('express');
const router = express.Router();

const gameLineupsController = require('../controllers/game_lineups');

router.get('/game/:game_id/:team', async (req, res) => {
    const { game_id, team } = req.params;
    try {
        const game_lineups = await gameLineupsController.searchGameLineups(game_id, team);
        if (game_lineups) {
            res.json(game_lineups);
        } else {
            res.status(404).json({ error: 'Game lineups not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching game lineups data' });
    }
});





module.exports = router;