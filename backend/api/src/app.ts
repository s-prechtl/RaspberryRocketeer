import express from 'express';
import helmet from "helmet";
import morgan from 'morgan';
import {leaderboardRoute} from "./leaderboardRoute.js";
import {userRoute} from "./userRoute.js";


const app = express()
const port = 3000

app.use(helmet())

// configure & use logger
let morganFormatted = morgan('[:date[iso]] :method :url - :status')
app.use(morganFormatted);

app.use('/leaderboard', leaderboardRoute)
app.use('/user', userRoute)

app.get('/helloworld', (req, res) => {
    res.json({message: "Hello World!"})
})


app.listen(port, () => {
    console.log(`Server started at http://localhost:3000`);
})