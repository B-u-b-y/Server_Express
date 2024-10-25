const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/games');

router.get('/games/:appearances', async (req, res) => {

    const {appearances} = req.params;
    try{
        const games = await gamesController.searchAppearancesGame(appearances);
        if(games){
            res.json(games);
        }else{
            res.status(404).json({error: 'Games not found'});
        }
    }catch (error){
        res.status(500).json({error: 'An error occurred while fetching games data'});
    }
});

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




module.exports = router;