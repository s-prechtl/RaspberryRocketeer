import {LeaderboardEntry} from "./LeaderboardEntry.js";

export class Leaderboard<T> {
    content: LeaderboardEntry<T>[];
}