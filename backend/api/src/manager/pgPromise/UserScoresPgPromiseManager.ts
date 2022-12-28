import {UserScoresManager} from "../UserScoresManager.js";
import {UserScores} from "../../model/UserScores.js";
import {Database} from "../../Database.js";

export class UserScoresPgPromiseManager extends UserScoresManager {
    public async getById(id: number): Promise<UserScores> {
        const raw = await Database.db.oneOrNone(
            'SELECT * FROM user_scores WHERE user_id = $1;', id
        );
        return this.serialize(raw);
    }

    protected serialize(raw: any): UserScores {
        return {
            userId: raw.user_id,
            highscore: raw.highscore,
            totalScore: raw.total_score,
            totalPlaytime: raw.total_playtime,
            averageScore: raw.average_score,
            gamesPlayed: raw.games_played,
        };
    }

    protected deserialize(parsed: UserScores): any {
        throw new Error("Method not implemented.")
    }
}