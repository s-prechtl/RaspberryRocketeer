import {UserScoresRepository} from "../UserScoresRepository.js";
import {UserScores} from "../../model/UserScores.js";
import {Database} from "../../Database.js";

export class UserScoresPgPromiseRepository extends UserScoresRepository {
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
}