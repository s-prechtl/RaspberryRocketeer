import express from 'express';
import {Database} from "./Database.js";

import helmet from "helmet";
import bodyParser from "body-parser";
import morgan from 'morgan';
import {UserDataManager} from "./manager/UserDataManager.js";
import {UserDataPgPromiseSerializer} from "./manager/UserDataPgPromiseSerializer.js";
import {leaderboardRouter} from "./leaderboardRouter.js";


const app = express()
const port = 3000

app.use(helmet())

// configure & use logger
let morganFormatted = morgan('[:date[iso]] :method :url - :status')
app.use(morganFormatted);

app.use('/leaderboard', leaderboardRouter)

app.get('/helloworld', (req, res) => {
    res.json({message: "Hello World!"})
})

app.get('/highscore', async (req, res) => {
    let data = await Database.db.manyOrNone('SELECT * FROM lb_highscore;')
        .catch((error) => console.log(error.message))
    res.json(data)
})

app.get('/user/:username', async (req, res) => {
    let data = await Database.db.oneOrNone(
        'SELECT * FROM user_data WHERE username = $1;',
        [req.params.username])
        .catch((error) => console.log(error.message)
    )
    let userDataManager: UserDataManager = new UserDataManager(data, new UserDataPgPromiseSerializer);
    res.json(userDataManager.userData);
})





app.listen(port, () => {
    console.log(`Server started at http://localhost:3000`);
})