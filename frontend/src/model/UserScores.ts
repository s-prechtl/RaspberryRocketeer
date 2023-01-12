import {Time} from "./Time.js";

export interface UserScores {
    userId: number,
    highscore: number,
    totalScore: number,
    totalPlaytime: Time,
    averageScore: number,
    gamesPlayed: number,
}