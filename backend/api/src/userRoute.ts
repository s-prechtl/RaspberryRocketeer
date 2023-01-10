import express from "express";
import { body, param, validationResult } from 'express-validator';
import {UserScoresPgPromiseRepository} from "./repositories/pgPromise/UserScoresPgPromiseRepository.js";
import {UserPgPromiseRepository} from "./repositories/pgPromise/UserPgPromiseRepository.js";
import {UserRepository} from "./repositories/UserRepository.js";
import {UserScoresRepository} from "./repositories/UserScoresRepository.js";
import {User} from "./model/User.js";

export const userRoute = express.Router()
userRoute.use(express.json())

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
            const userManager: UserRepository = new UserPgPromiseRepository();

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
        const userManager: UserRepository = new UserPgPromiseRepository;

        try {
            // check if user with given id exists
            if (!await userManager.withIdExists(userId)) {
                return res.status(400).json({ errors: [{msg: `User with id ${userId} does not exist.`}] })
            }
            // get & return data
            const userScoresManager: UserScoresRepository = new UserScoresPgPromiseRepository;
            const userScores = await userScoresManager.getById(userId);
            res.json(userScores);
        } catch (error) {
            // handle errors
            console.log(error)
            res.status(500).json({ errors: [{msg: "Internal server error"}]})
        }
    }
)
