import express from "express";
import {GameRepository} from "./repositories/GameRepository.js";
import {GamePgPromiseRepository} from "./repositories/pgPromise/GamePgPromiseRepository.js";
import {Game} from "./model/Game.js";
import {body, CustomValidator, validationResult} from "express-validator";
import {UserRepository} from "./repositories/UserRepository.js";
import {UserPgPromiseRepository} from "./repositories/pgPromise/UserPgPromiseRepository.js";

export const gameRoute = express.Router()

gameRoute.use(express.json())

const userWithIdExists: CustomValidator = userId => {
    try {
        const userRepo: UserRepository = new UserPgPromiseRepository;
        return userRepo.withIdExists(userId).then(exists => {
            if (!exists) return Promise.reject("User does not exist");
        });
    } catch (error) {
        console.log(error);
    }
}

gameRoute.post(
    '/add',
    body('playtime')
        .matches("([0-5]\\d:)?[0-5]\\d:[0-5]\\d"),
    body('date')
        .isDate(),
    body('userId')
        .isInt({min: 1})
        .custom(userWithIdExists),
    async (req, res) => {
    try {
        //region validate parameters
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //endregion
        let game: Game = req.body;
        const gameRepo: GameRepository = new GamePgPromiseRepository;
        const inserted: Game = await gameRepo.insert(game);
        res.send(inserted);
    } catch (error) {
        // handle errors
        console.log(error)
        res.status(500).json({ errors: [{msg: "Internal server error"}]})
    }
})