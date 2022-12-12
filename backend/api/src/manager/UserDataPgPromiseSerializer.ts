import {UserData} from "../model/UserData.js";
import {UserDataSerializer} from "./UserDataSerializer.js";

export class UserDataPgPromiseSerializer implements UserDataSerializer {
    deserialize(userData: UserData): any {
        throw new Error("Method not implemented")
    }

    serialize(data: any): UserData {
        return {
            username: data.username,
            highscore: data.highscore,
            totalScore: data.total_score,
            totalPlaytime: data.total_playtime,
            averageScore: data.averageScore,
            gamesPlayed: data.games_played,
        }
    }
}