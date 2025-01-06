const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/games');

/**
 * @swagger
 * /api/competition/{competition_id}:
 *  get:
 *    summary: Get games for a specific competition
 *    tags:
 *      - Competitions
 *    description: Fetches the game details for a specific competition, including teams, scores, managers, and other relevant information for each game.
 *    parameters:
 *      - in: path
 *        name: competition_id
 *        required: true
 *        description: The ID of the competition whose game data is being requested
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successfully fetched the competition games data
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
 *                  competition_id:
 *                    type: string
 *                  season:
 *                    type: integer
 *                  round:
 *                    type: string
 *                  date:
 *                    type: string
 *                    format: date-time
 *                  home_club_id:
 *                    type: integer
 *                  away_club_id:
 *                    type: integer
 *                  home_club_goals:
 *                    type: integer
 *                  away_club_goals:
 *                    type: integer
 *                  home_club_manager_name:
 *                    type: string
 *                  away_club_manager_name:
 *                    type: string
 *                  stadium:
 *                    type: string
 *                  attendance:
 *                    type: integer
 *                  referee:
 *                    type: string
 *                  home_club_formation:
 *                    type: string
 *                  away_club_formation:
 *                    type: string
 *                  home_club_name:
 *                    type: string
 *                  away_club_name:
 *                    type: string
 *                  aggregate:
 *                    type: string
 *                  competition_type:
 *                    type: string
 *                  country:
 *                    type: string
 *      404:
 *        description: No games found for the provided competition ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "Games not found"
 *      500:
 *        description: Internal server error occurred while fetching the games data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "An error occurred while fetching games data"
 */
router.get('/competition/:competition_id', async (req, res) => {
        const {competition_id} = req.params;
        try{
            const games = await gamesController.searchCompetitionGames(competition_id);
            if(games){
                res.json(games);
            }else{
                res.status(404).json({error: 'Games not found'});
            }
        }catch (error){
            res.status(500).json({error: 'An error occurred while fetching games data'});
        }
});


/**
 * @swagger
 * /api/standings/{competition_id}:
 *  get:
 *    summary: Get the standings for a specific competition
 *    tags:
 *      - Competitions
 *    description: Fetches the standings for a specific competition, including the teams' rankings, points, and other details for each group/round.
 *    parameters:
 *      - in: path
 *        name: competition_id
 *        required: true
 *        description: The ID of the competition whose standings data is being requested
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successfully fetched the competition standings data
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  round:
 *                    type: string
 *                  teams:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        team_name:
 *                          type: string
 *                        points:
 *                          type: integer
 *                        goals_scored:
 *                          type: integer
 *                        goals_against:
 *                          type: integer
 *                        goal_difference:
 *                          type: integer
 *                        position:
 *                          type: integer
 *      404:
 *        description: No standings found for the provided competition ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "Games not found"
 *      500:
 *        description: Internal server error occurred while fetching the standings data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "An error occurred while fetching games data"
 */

router.get('/standings/:competition_id', async (req, res) => {
    const {competition_id} = req.params;
    try{
        const games = await gamesController.searchCompetitionStandings(competition_id);
        if(games){
            res.json(games);
        }else{
            res.status(404).json({error: 'Games not found'});
        }
    }catch (error){
        res.status(500).json({error: 'An error occurred while fetching games data'});
    }
});



module.exports = router;