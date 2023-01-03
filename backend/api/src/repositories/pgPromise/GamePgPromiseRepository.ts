import {GameRepository} from "../GameRepository.js";
import {Game} from "../../model/Game.js";
import {Database} from "../../Database.js";

export class GamePgPromiseRepository extends GameRepository{
    public async insert(game: Game): Promise<Game> {
        const raw: any = await Database.db.oneOrNone(
            'INSERT INTO game (score, playtime, date, user_id) VALUES ($(score), $(playtime), $(date), $(userId)) RETURNING *;',
            game
        );
        return this.serialize(raw);
    }

    serialize(raw: any): Game {
        return {
            id: raw.id,
            score: raw.score,
            playtime: raw.playtime,
            date: raw.date,
            userId: raw.userId,
        };
    }

}