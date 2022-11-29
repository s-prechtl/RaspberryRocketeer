import express from 'express';
import bodyParser from "body-parser";
import pgPromise from "pg-promise";
const pgp = pgPromise({});
const db = pgp('postgres://postgres:postgres@localhost:5432/rr')
const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/test', (req, res) => {
    res.send(JSON.stringify({success: true}))
})

app.post('/highscore', async (req, res) => {
    if (req.body !== undefined) {
        let data = await db.any(
            'SELECT * FROM lb_highscore LIMIT $1 OFFSET $2',
            [req.body.itemsPerPage, req.body.itemsPerPage * (req.body.page - 1)]
        )
        res.send(data)
    } else {
        res.status(400)
        res.send("itemsPerPage and/or page not defined")
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})