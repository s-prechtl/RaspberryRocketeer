import express from 'express';
import helmet from "helmet";
import morgan from 'morgan';
import cors from 'cors';
import {leaderboardRoute} from "./leaderboardRoute.js";
import {userRoute} from "./userRoute.js";
import {gameRoute} from "./gameRoute.js";

// initialize express
const app = express()
const port = 3000

// use needed middlewares
app.use(helmet())
app.use(cors())

// configure & use logger
let morganFormatted = morgan('[:date[iso]] :method :url - :status')
app.use(morganFormatted);

app.use('/leaderboard', leaderboardRoute)
app.use('/user', userRoute)
app.use('/game', gameRoute)


app.listen(port, () => {
    console.log(`Server started at http://localhost:3000`);
})