import {UserScores} from "../model/UserScores.js";

export abstract class UserScoresRepository {
    abstract getById(userId: number): Promise<UserScores>;
}
