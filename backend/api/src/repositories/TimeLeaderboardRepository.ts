import {TimeLeaderboard} from "../model/Leaderboard.js";

export abstract class TimeLeaderboardRepository {
    abstract getAll(): Promise<TimeLeaderboard>;
    abstract getPage(entriesPerPage: number, page: number);
}