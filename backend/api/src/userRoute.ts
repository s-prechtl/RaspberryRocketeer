import express from "express";
import {body, param, validationResult} from 'express-validator';
import {UserScoresPgPromiseRepository} from "./repositories/pgPromise/UserScoresPgPromiseRepository.js";
import {UserPgPromiseRepository} from "./repositories/pgPromise/UserPgPromiseRepository.js";
import {UserRepository} from "./repositories/UserRepository.js";
import {UserScoresRepository} from "./repositories/UserScoresRepository.js";
import {User} from "./model/User.js";
import {USERNAME_VALIDATION_REGEX, userWithIdExists, userWithNameDoesNotExists} from "./validators.js";

export const userRoute = express.Router()
userRoute.use(express.json())


userRoute.post(
    '/register',
    body('name')
        .isString()
        .isLength({min: 3, max: 32})
        .matches(USERNAME_VALIDATION_REGEX)
        .custom(userWithNameDoesNotExists),
    /**
     * After processing the errors of express-validator, inserts the user into DB
     * Returns the inserted user
     * @param req
     * body {
     *     name: string
     * }
     * @param res json: User
     */
    async (req, res) => {
        try {
            //region validate parameters
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            //endregion
            const username: string = req.body.name;
            const userRepo: UserRepository = new UserPgPromiseRepository();

            // insert & return user
            const inserted: User = await userRepo.insert({name: username});
            res.json(inserted);
        } catch (error) {
            // handle errors
            console.log(error)
            res.status(500).json({ errors: [{msg: "Internal server error"}]})
        }
    }
)

userRoute.get('/:userId/scores',
    param('userId')
        .isInt({min: 1})
        .custom(userWithIdExists),
    /**
     * After processing the errors of express-validator, fetches the scores from the DB
     * Returns user scores
     * @param req
     * params {
     *      userId: number
     * }
     * @param res json: UserScores
     */
    async (req, res) => {
        //region validate parameters
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //endregion

        const userId: number = req.params.userId;

        try {
            // get & return data
            const userScoresRepo: UserScoresRepository = new UserScoresPgPromiseRepository;
            const userScores = await userScoresRepo.getById(userId);
            res.json(userScores);
        } catch (error) {
            // handle errors
            console.log(error)
            res.status(500).json({ errors: [{msg: "Internal server error"}]})
        }
    }
)
