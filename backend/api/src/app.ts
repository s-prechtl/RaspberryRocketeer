import express from 'express';
import helmet from "helmet";
import morgan from 'morgan';
import {leaderboardRoute} from "./leaderboardRoute.js";
import {userRoute} from "./userRoute.js";
import {gameRoute} from "./gameRoute.js";


const app = express()
const port = 3000

app.use(helmet())

// configure & use logger
let morganFormatted = morgan('[:date[iso]] :method :url - :status')
app.use(morganFormatted);

app.use('/leaderboard', leaderboardRoute)
app.use('/user', userRoute)
app.use('/game', gameRoute)


app.listen(port, () => {
    console.log(`Server started at http://localhost:3000`);
})