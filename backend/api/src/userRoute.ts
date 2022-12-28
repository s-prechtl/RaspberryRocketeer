import express from "express";
import { body, param, validationResult } from 'express-validator';
import {UserScoresPgPromiseManager} from "./manager/pgPromise/UserScoresPgPromiseManager.js";
import {UserPgPromiseManager} from "./manager/pgPromise/UserPgPromiseManager.js";
import {UserManager} from "./manager/UserManager.js";
import {UserScoresManager} from "./manager/UserScoresManager.js";
import {User} from "./model/User.js";


export const userRoute = express.Router()

userRoute.post(
    '/register',
    body('name')
        .isString()
        .isLength({min: 3, max: 32})
        .matches('[a-zA-Z0-9_.\\- ]*'),
    async (req, res) => {
        try {
            //region validate parameters
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            //endregion

            const username: string = req.body.name;
            const userManager: UserManager = new UserPgPromiseManager();

            // check if username already exists
            if (await userManager.withNameExists(username)) {
                return res.status(400).json({ errors: [{msg: `User with name '${username}' already exists.`}] })
            }
            // insert & return user
            const inserted: User = await userManager.insert({name: username});
            res.json(inserted);
        } catch (error) {
            // handle errors
            console.log(error)
            res.status(500).json({ errors: [{msg: "Internal server error"}]})
        }
    }
)

userRoute.get('/:userId/scores',
    param('userId').isInt({min: 1}),
    async (req, res) => {
        //region validate parameters
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //endregion

        const userId: number = req.params.userId;
        const userManager: UserManager = new UserPgPromiseManager;

        try {
            // check if user with given id exists
            if (!await userManager.withIdExists(userId)) {
                return res.status(400).json({ errors: [{msg: `User with id ${userId} does not exist.`}] })
            }
            // get & return data
            const userScoresManager: UserScoresManager = new UserScoresPgPromiseManager;
            const userScores = await userScoresManager.getById(userId);
            res.json(userScores);
        } catch (error) {
            // handle errors
            console.log(error)
            res.status(500).json({ errors: [{msg: "Internal server error"}]})
        }
    }
)
