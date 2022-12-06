import express from 'express';

import pgPromise from "pg-promise";
import helmet from "helmet";
import bodyParser from "body-parser";
import morgan from 'morgan';

const app = express()
const port = 3000

app.use(helmet())

// configure & use logger
let morganFormatted = morgan('[:date[iso]] :method :url - :status')
app.use(morganFormatted);

// init database connection
const pgp = pgPromise({});
const db = pgp('postgres://postgres:postgres@localhost:5432/rr')


app.get('/highscore', async (req, res) => {
    let data = await db.any(
        'SELECT * FROM lb_highscore;'
    )
    res.send(data)
})

app.listen(port, () => {
    morganFormatted.log(`Server started at http://localhost:3000`);
})