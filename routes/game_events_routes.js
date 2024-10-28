const express = require('express');
const router = express.Router();

const gameEventsController = require('../controllers/game_events');

router.get('/game/:game_id', async (req, res) => {
    const { game_id } = req.params;
    try {
        const game_events = await gameEventsController.searchGameEvents(game_id);
        if (game_events) {
            res.json(game_events);
        } else {
            res.status(404).json({ error: 'Game events not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching game events data' });
    }
});






module.exports = router;