const express = require('express');
const router = express.Router();

const gameEventsController = require('../controllers/game_events');

/**
 * @swagger
 * /api/game/{game_id}:
 *  get:
 *    summary: Get all game events for a specific game
 *    tags:
 *      - Game Events
 *    description: Fetches all the events (goals, substitutions, etc.) for a specific game based on the game_id
 *    parameters:
 *      - in: path
 *        name: game_id
 *        required: true
 *        description: The ID of the game whose event data is being requested
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successfully fetched the game events data
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  game_event_id:
 *                    type: string
 *                  date:
 *                    type: string
 *                    format: date-time
 *                  game_id:
 *                    type: integer
 *                  minute:
 *                    type: integer
 *                  type:
 *                    type: string
 *                  club_id:
 *                    type: integer
 *                  player_id:
 *                    type: integer
 *                  description:
 *                    type: string
 *                  player_in_id:
 *                    type: integer
 *                  player_assist_id:
 *                    type: integer
 *      404:
 *        description: No game events found for the provided game ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "Game events not found"
 *      500:
 *        description: Internal server error occurred while fetching the game events data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "An error occurred while fetching game events data"
 */

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