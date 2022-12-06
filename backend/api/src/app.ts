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
const db = pgp('postgres://postgres:postgres@db:5432/rr')

app.get('/helloworld', (req, res) => {
    res.json({message: "Hello World!"})
})

app.get('/highscore', async (req, res) => {
    let data = await dbQueryCatcher(async () =>
        await db.manyOrNone('SELECT * FROM lb_highscore;')
    )
    res.json(data)
})

async function dbQueryCatcher(request): Promise<any> {
    let data;
    try {
        data = await request();
    } catch (e) {
        console.log((e as Error).message)
    }
    return data;
}

app.listen(port, () => {
    console.log(`Server started at http://localhost:3000`);
})