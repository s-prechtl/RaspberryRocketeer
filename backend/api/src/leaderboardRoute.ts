import express from 'express';
import {TimeLeaderboardRepository} from "./repositories/TimeLeaderboardRepository.js";
import {TimeLeaderboardPgPromiseRepository} from "./repositories/pgPromise/TimeLeaderboardPgPromiseRepository.js";
import {HighscoreLeaderboardPgPromiseRepository} from "./repositories/pgPromise/HighscoreLeaderboardPgPromiseRepository.js";
import {HighscoreLeaderboardRepository} from "./repositories/HighscoreLeaderboardRepository.js";
import {HighscoreLeaderboard, TimeLeaderboard} from "./model/Leaderboard.js";

export const leaderboardRoute = express.Router()

leaderboardRoute.get('/highscore', async (req, res) => {
    try {
        const highscoreLeaderboardManager: HighscoreLeaderboardRepository = new HighscoreLeaderboardPgPromiseRepository;
        const highscoreLeaderboard: HighscoreLeaderboard = await highscoreLeaderboardManager.getAll();
        res.send(highscoreLeaderboard);
    } catch (error) {
        // handle errors
        console.log(error)
        res.status(500).json({ errors: [{msg: "Internal server error"}]})
    }
})

leaderboardRoute.get('/totalplaytime', async (req, res) => {
    try {
        const timeLeaderboardManager: TimeLeaderboardRepository = new TimeLeaderboardPgPromiseRepository;
        const timeLeaderboard: TimeLeaderboard = await timeLeaderboardManager.getAll();
        res.send(timeLeaderboard);
    } catch (error) {
        // handle errors
        console.log(error)
        res.status(500).json({ errors: [{msg: "Internal server error"}]})
    }
})