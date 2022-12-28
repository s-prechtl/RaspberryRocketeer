import express from 'express';
import {TimeLeaderboardManager} from "./manager/TimeLeaderboardManager.js";
import {TimeLeaderboardPgPromiseManager} from "./manager/pgPromise/TimeLeaderboardPgPromiseManager.js";
import {HighscoreLeaderboardPgPromiseManager} from "./manager/pgPromise/HighscoreLeaderboardPgPromiseManager.js";
import {HighscoreLeaderboardManager} from "./manager/HighscoreLeaderboardManager.js";
import {HighscoreLeaderboard, TimeLeaderboard} from "./model/Leaderboard.js";

export const leaderboardRoute = express.Router()


leaderboardRoute.get('/highscore', async (req, res) => {
    try {
        const highscoreLeaderboardManager: HighscoreLeaderboardManager = new HighscoreLeaderboardPgPromiseManager;
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
        const timeLeaderboardManager: TimeLeaderboardManager = new TimeLeaderboardPgPromiseManager;
        const timeLeaderboard: TimeLeaderboard = await timeLeaderboardManager.getAll();
        res.send(timeLeaderboard);
    } catch (error) {
        // handle errors
        console.log(error)
        res.status(500).json({ errors: [{msg: "Internal server error"}]})
    }
})