import express from 'express';
export const leaderboardRouter = express.Router()


leaderboardRouter.get('/highscore', (req, res) => {
    res.send('highscore')
})

leaderboardRouter.get('/totalplaytime', (req, res) => {
    res.send('total play time')
})