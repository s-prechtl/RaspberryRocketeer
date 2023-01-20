import {HighscoreLeaderboard} from "../model/Leaderboard.js";

export abstract class HighscoreLeaderboardRepository {
    abstract getAll(): Promise<HighscoreLeaderboard>;
    abstract getPage(entriesPerPage: number, page: number): Promise<HighscoreLeaderboard>
}