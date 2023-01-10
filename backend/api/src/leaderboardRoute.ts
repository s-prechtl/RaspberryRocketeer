import express from 'express';
import {TimeLeaderboardRepository} from "./repositories/TimeLeaderboardRepository.js";
import {TimeLeaderboardPgPromiseRepository} from "./repositories/pgPromise/TimeLeaderboardPgPromiseRepository.js";
import {HighscoreLeaderboardPgPromiseRepository} from "./repositories/pgPromise/HighscoreLeaderboardPgPromiseRepository.js";
import {HighscoreLeaderboardRepository} from "./repositories/HighscoreLeaderboardRepository.js";
import {HighscoreLeaderboard, TimeLeaderboard} from "./model/Leaderboard.js";

export const leaderboardRoute = express.Router()

leaderboardRoute.get('/highscore',
    /**
     * Returns the highscore leaderboard as JSON response, fetched from DB
     * @param req
     * @param res json: HighscoreLeaderboard
     */
    async (req, res) => {
    try {
        const highscoreLeaderboardRepo: HighscoreLeaderboardRepository = new HighscoreLeaderboardPgPromiseRepository;
        const highscoreLeaderboard: HighscoreLeaderboard = await highscoreLeaderboardRepo.getAll();
        res.send(highscoreLeaderboard);
    } catch (error) {
        // handle errors
        console.log(error)
        res.status(500).json({ errors: [{msg: "Internal server error"}]})
    }
})

leaderboardRoute.get('/totalplaytime',
    /**
     * Returns the total playtime leaderboard as JSON response, fetched from DB
     * @param req
     * @param res json: TimeLeaderboard
     */
    async (req, res) => {
    try {
        const timeLeaderboardRepo: TimeLeaderboardRepository = new TimeLeaderboardPgPromiseRepository;
        const timeLeaderboard: TimeLeaderboard = await timeLeaderboardRepo.getAll();
        res.send(timeLeaderboard);
    } catch (error) {
        // handle errors
        console.log(error)
        res.status(500).json({ errors: [{msg: "Internal server error"}]})
    }
})