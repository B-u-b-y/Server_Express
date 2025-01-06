const express = require('express');
const router = express.Router();
const clubGamesController = require('../controllers/club_games');

/**
 * @swagger
 * /api/club/games/{club_id}:
 *  get:
 *    summary: Get all games data for a specific club
 *    tags:
 *      - Club Games
 *    description: Fetches all the games data for a specific club based on the club_id
 *    parameters:
 *      - in: path
 *        name: club_id
 *        required: true
 *        description: The ID of the club whose game data is being requested
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successfully fetched the club games data
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  game_id:
 *                    type: integer
 *                  club_id:
 *                    type: integer
 *                  own_goals:
 *                    type: integer
 *                  own_position:
 *                    type: integer
 *                  own_manager_name:
 *                    type: string
 *                  opponent_id:
 *                    type: integer
 *                  opponent_goals:
 *                    type: integer
 *                  opponent_position:
 *                    type: integer
 *                  opponent_manager_name:
 *                    type: string
 *                  hosting:
 *                    type: string
 *                  is_win:
 *                    type: integer
 *      404:
 *        description: No games found for the provided club ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "Club games not found"
 *      500:
 *        description: Internal server error occurred while fetching the club games data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "An error occurred while fetching club games data"
 */
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