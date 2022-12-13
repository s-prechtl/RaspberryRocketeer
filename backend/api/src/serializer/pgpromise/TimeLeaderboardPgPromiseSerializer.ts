import {TimeLeaderboardSerializer} from "../TimeLeaderboardSerializer.js";
import {Leaderboard, LeaderboardEntry} from "../../model/Leaderboard.js";
import {Time} from "../../model/Time.js";

export class TimeLeaderboardPgPromiseSerializer implements TimeLeaderboardSerializer {
    deserialize(parsedData: Leaderboard<Time>): any {
        throw new Error("Method not implemented.")
    }

    serialize(rawData: any): Leaderboard<Time> {
        return rawData.map((item) => {
            let newItem: LeaderboardEntry<Time> = {
                rank: item.rank,
                username: item.name,
                score: item.total_playtime,
            }
            return newItem
        });
    }
}