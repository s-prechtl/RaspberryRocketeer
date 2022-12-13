import {Serializer} from "./Serializer.js";
import {Leaderboard} from "../model/Leaderboard.js";

export interface HighscoreLeaderboardSerializer extends Serializer<Leaderboard<number>> {}