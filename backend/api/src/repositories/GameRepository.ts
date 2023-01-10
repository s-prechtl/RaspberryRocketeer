import {Game} from "../model/Game.js";

export abstract class GameRepository {
    abstract insert(game: Game): Promise<Game>;
}