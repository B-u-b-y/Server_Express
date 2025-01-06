const express = require('express');
const router = express.Router();

const gameLineupsController = require('../controllers/game_lineups');

/**
 * @swagger
 * /api/game/{game_id}/{team}:
 *  get:
 *    summary: Get the game lineups for a specific game and team
 *    tags:
 *      - Game Lineups
 *    description: Fetches the lineup details for a specific game and team, including player names, positions, and team captain.
 *    parameters:
 *      - in: path
 *        name: game_id
 *        required: true
 *        description: The ID of the game whose lineup data is being requested
 *        schema:
 *          type: integer
 *      - in: path
 *        name: team
 *        required: true
 *        description: The ID of the team whose lineup is being requested
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Successfully fetched the game lineups data
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  game_lineups_id:
 *                    type: string
 *                  game_id:
 *                    type: integer
 *                  club_id:
 *                    type: integer
 *                  type:
 *                    type: string
 *                  number:
 *                    type: integer
 *                  player_id:
 *                    type: integer
 *                  player_name:
 *                    type: string
 *                  team_captain:
 *                    type: integer
 *                  position:
 *                    type: string
 *      404:
 *        description: No game lineups found for the provided game ID and team
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "Game lineups not found"
 *      500:
 *        description: Internal server error occurred while fetching the game lineups data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "An error occurred while fetching game lineups data"
 */
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