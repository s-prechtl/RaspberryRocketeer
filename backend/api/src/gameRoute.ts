import express from "express";
import {GameRepository} from "./repositories/GameRepository.js";
import {GamePgPromiseRepository} from "./repositories/pgPromise/GamePgPromiseRepository.js";
import {Game} from "./model/Game.js";
import {body, validationResult} from "express-validator";
import {TIME_VALIDATION_REGEX, userWithIdExists} from "./validators.js";

export const gameRoute = express.Router()

gameRoute.use(express.json())

/**
 * Test
 */
gameRoute.post(
    '/add',
    body('playtime')
        .matches(TIME_VALIDATION_REGEX),
    body('date')
        .isDate(),
    body('userId')
        .isInt({min: 1})
        .custom(userWithIdExists),
    body('score')
        .isInt({min: 0}),
    /**
     * After processing the errors of express-validator, inserts the game into the DB
     * @param req
     * body {
     *     playtime: string,
     *     date: Date,
     *     userId: int
     * }
     * @param res json: Game
     */
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