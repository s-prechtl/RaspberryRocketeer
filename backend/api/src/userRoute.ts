import express from "express";
import {Database} from "./Database.js";
import {UserScoresManager} from "./manager/UserScoresManager.js";
import {UserScoresPgPromiseSerializer} from "./serializer/pgpromise/UserScoresPgPromiseSerializer.js";
import bodyParser from "body-parser";

export const userRoute = express.Router()

userRoute.use(bodyParser.json)

userRoute.get('/:username/scores', async (req, res) => {
    let data = await Database.db.oneOrNone(
        'SELECT * FROM user_scores INNER JOIN "user" ON user_scores.user_id = "user".id WHERE "user".name = $1;',
        [req.params.username])
        .catch((error) => console.log(error.message)
    )
    let userDataManager: UserScoresManager = new UserScoresManager(data, new UserScoresPgPromiseSerializer);
    res.json(userDataManager.content);
})

userRoute.post('/register', async (req, res) => {
    if (req.body.name == undefined) {
        res.status(400).send("'name' was not defined");
        return;
    }
    await Database.db.none(
        'INSERT INTO "user" (name) VALUES ($1);', [req.body.name]
    );
    res.status(200).send();
})