import express from 'express';
import {query, validationResult} from 'express-validator';
import {TimeLeaderboardRepository} from "./repositories/TimeLeaderboardRepository.js";
import {TimeLeaderboardPgPromiseRepository} from "./repositories/pgPromise/TimeLeaderboardPgPromiseRepository.js";
import {HighscoreLeaderboardPgPromiseRepository} from "./repositories/pgPromise/HighscoreLeaderboardPgPromiseRepository.js";
import {HighscoreLeaderboardRepository} from "./repositories/HighscoreLeaderboardRepository.js";
import {HighscoreLeaderboard, TimeLeaderboard} from "./model/Leaderboard.js";

export const leaderboardRoute = express.Router()

leaderboardRoute.get('/highscore',
    query('pagination').toBoolean(),
    query('entriesPerPage').optional().isInt({min: 1}).toInt(),
    query('page').optional().isInt({min: 0}).toInt(),
    /**
     * Returns the highscore leaderboard as JSON response, fetched from DB
     * @param req
     * @param res json: HighscoreLeaderboard
     */
    async (req, res) => {
    try {
        //region validate parameters
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //endregion
        const highscoreLeaderboardRepo: HighscoreLeaderboardRepository = new HighscoreLeaderboardPgPromiseRepository;
        let highscoreLeaderboard: HighscoreLeaderboard;
        if (req.query.pagination == true) {
            const entriesPerPage = req.query.entriesPerPage;
            const page = req.query.page;
            highscoreLeaderboard = await highscoreLeaderboardRepo.getPage(entriesPerPage, page);
        } else {
            highscoreLeaderboard = await highscoreLeaderboardRepo.getAll();
        }
        res.send(highscoreLeaderboard);
    } catch (error) {
        // handle errors
        console.log(error)
        res.status(500).json({ errors: [{msg: "Internal server error"}]})
    }
})

leaderboardRoute.get('/totalplaytime',
    query('pagination').toBoolean(),
    query('entriesPerPage').optional().isInt({min: 1}).toInt(),
    query('page').optional().isInt({min: 0}).toInt(),
    /**
     * Returns the total playtime leaderboard as JSON response, fetched from DB
     * @param req
     * @param res json: TimeLeaderboard
     */
    async (req, res) => {
    try {
        console.log(req.query)
        //region validate parameters
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //endregion
        const timeLeaderboardRepo: TimeLeaderboardRepository = new TimeLeaderboardPgPromiseRepository;
        let timeLeaderboard: TimeLeaderboard;
        console.log(req.query)
        if (req.query.pagination == true) {
            const entriesPerPage = req.query.entriesPerPage;
            const page = req.query.page;
            timeLeaderboard = await timeLeaderboardRepo.getPage(entriesPerPage, page);
        } else {
            timeLeaderboard = await timeLeaderboardRepo.getAll();
        }
        res.send(timeLeaderboard);
    } catch (error) {
        // handle errors
        console.log(error)
        res.status(500).json({ errors: [{msg: "Internal server error"}]})
    }
})