import {HighscoreLeaderboardSerializer} from "../HighscoreLeaderboardSerializer.js";
import {Leaderboard, LeaderboardEntry} from "../../model/Leaderboard.js";

export class HighscoreLeaderboardPgPromiseSerializer implements HighscoreLeaderboardSerializer {
    deserialize(parsedData: Leaderboard<number>): any {
        throw new Error("Method not implemented.")
    }

    serialize(rawData: any): Leaderboard<number> {
        return rawData.map((item) => {
            let newItem: LeaderboardEntry<number> = {
                rank: item.rank,
                username: item.name,
                score: item.highscore,
            }
            return newItem
        });
    }

}