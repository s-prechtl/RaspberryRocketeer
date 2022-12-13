import {UserScores} from "../../model/UserScores.js";
import {UserScoresSerializer} from "../UserScoresSerializer.js";

export class UserScoresPgPromiseSerializer implements UserScoresSerializer {
    deserialize(parsedData: UserScores): any {
        throw new Error("Method not implemented");
    }

    serialize(rawData: any): UserScores {
        return {
            username: rawData.name,
            highscore: rawData.highscore,
            totalScore: rawData.total_score,
            totalPlaytime: rawData.total_playtime,
            averageScore: rawData.averageScore,
            gamesPlayed: rawData.games_played,
        };
    }

}