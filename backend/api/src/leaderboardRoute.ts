import express from 'express';
import {Database} from "./Database.js";
import {TimeLeaderboardManager} from "./manager/TimeLeaderboardManager.js";
import {HighscoreLeaderboardManager} from "./manager/HighscoreLeaderboardManager.js";
import {
    HighscoreLeaderboardPgPromiseSerializer
} from "./serializer/pgpromise/HighscoreLeaderboardPgPromiseSerializer.js";
import {TimeLeaderboardPgPromiseSerializer} from "./serializer/pgpromise/TimeLeaderboardPgPromiseSerializer.js";

export const leaderboardRoute = express.Router()


leaderboardRoute.get('/highscore', async (req, res) => {
    let data = await Database.db.manyOrNone('SELECT * FROM lb_highscore INNER JOIN "user" ON user_id = id ORDER BY RANK;')
    const leaderboardManager = new HighscoreLeaderboardManager(data, new HighscoreLeaderboardPgPromiseSerializer);
    res.send(leaderboardManager.content)
})

leaderboardRoute.get('/totalplaytime', async (req, res) => {
    let data = await Database.db.manyOrNone('SELECT * FROM lb_total_playtime INNER JOIN "user" ON user_id = id ORDER BY RANK;')
    const leaderboardManager = new TimeLeaderboardManager(data, new TimeLeaderboardPgPromiseSerializer);
    res.send(leaderboardManager.content)
})