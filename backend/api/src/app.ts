import express from 'express';

import pgPromise from "pg-promise";
import helmet from "helmet";
import bodyParser from "body-parser";
import morgan from 'morgan';

const app = express()
const port = 3000

app.use(helmet())

// init database connection
const pgp = pgPromise({});
const db = pgp('postgres://postgres:postgres@localhost:5432/rr')

// configure & use logger
let morganFormatted = morgan('[:date[iso]] :method :url - :status')
app.use(morganFormatted);


app.get('/highscore', async (req, res) => {
    let data = await db.any(
        'SELECT * FROM lb_highscore;'
    )
    res.send(data)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})