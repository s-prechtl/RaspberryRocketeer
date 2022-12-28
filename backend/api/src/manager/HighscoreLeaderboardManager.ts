import {HighscoreLeaderboard} from "../model/Leaderboard.js";
import {Manager} from "./Manager.js";

export abstract class HighscoreLeaderboardManager extends Manager<HighscoreLeaderboard>{
    abstract getAll(): Promise<HighscoreLeaderboard>;
}