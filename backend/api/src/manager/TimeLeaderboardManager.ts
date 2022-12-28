import {Manager} from "./Manager.js";
import {TimeLeaderboard} from "../model/Leaderboard.js";

export abstract class TimeLeaderboardManager extends Manager<TimeLeaderboard>{
    abstract getAll(): Promise<TimeLeaderboard>;
}