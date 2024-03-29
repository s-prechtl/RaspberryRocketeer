import {TimeLeaderboardRepository} from "../TimeLeaderboardRepository.js";
import {LeaderboardEntry, TimeLeaderboard} from "../../model/Leaderboard.js";
import {Database} from "../../Database.js";

export class TimeLeaderboardPgPromiseRepository extends TimeLeaderboardRepository {
    async getAll(): Promise<TimeLeaderboard> {
        const raw: any = await Database.db.manyOrNone(
            'SELECT * FROM lb_total_playtime INNER JOIN "user" ON user_id = id ORDER BY rank;'
        );
        return this.serialize(raw);
    }

    async getPage(entriesPerPage: number, page: number): Promise<TimeLeaderboard> {
        const raw: any = await Database.db.manyOrNone(
            'SELECT * FROM lb_total_playtime INNER JOIN "user" ON user_id = id ORDER BY rank LIMIT $1 OFFSET $2;',
            [entriesPerPage, page * entriesPerPage]
        );
        return this.serialize(raw);
    }

    //region serialization
    protected serialize(raw: any): TimeLeaderboard {
        return raw.map((item) => {
            let newItem: LeaderboardEntry<string> = {
                rank: item.rank,
                username: item.name,
                score: item.total_playtime,
            }
            return newItem
        });
    }
    //endregion
}