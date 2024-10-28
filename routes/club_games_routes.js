const express = require('express');
const router = express.Router();
const clubGamesController = require('../controllers/club_games');


router.get('/club/games/:club_id', async (req, res) => {
    const { club_id } = req.params;
    try {
        const club_games = await clubGamesController.searchClubGames(club_id);
        if (club_games) {
            res.json(club_games);
        } else {
            res.status(404).json({ error: 'Club games not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching club games data' });
    }
});









module.exports = router;