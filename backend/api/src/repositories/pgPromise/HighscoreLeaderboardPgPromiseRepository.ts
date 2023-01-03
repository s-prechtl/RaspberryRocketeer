import {HighscoreLeaderboardRepository} from "../HighscoreLeaderboardRepository.js";
import {HighscoreLeaderboard, LeaderboardEntry} from "../../model/Leaderboard.js";
import {Database} from "../../Database.js";

export class HighscoreLeaderboardPgPromiseRepository extends HighscoreLeaderboardRepository {
    async getAll(): Promise<HighscoreLeaderboard> {
        const raw: any = await Database.db.manyOrNone(
            'SELECT * FROM lb_highscore INNER JOIN "user" ON user_id = id ORDER BY RANK;'
        );
        return this.serialize(raw);
    }

    protected serialize(raw: any): HighscoreLeaderboard {
        return raw.map((item) => {
        let newItem: LeaderboardEntry<number> = {
            rank: item.rank,
            username: item.name,
            score: item.highscore,
        }
            return newItem;
        });
    }
}