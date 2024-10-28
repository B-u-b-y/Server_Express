// routes/player_valuations_routes.js
const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player_valuations');

// Ensure this is a GET route for fetching player by ID
router.get('/players/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const player = await playerController.searchPlayer(id);
        if (player) {
            res.json(player);
        } else {
            res.status(404).json({ error: 'Player not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching player data' });
    }
});

module.exports = router;
