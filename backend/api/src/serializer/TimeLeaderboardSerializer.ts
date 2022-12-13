import {Serializer} from "./Serializer.js";
import {Leaderboard} from "../model/Leaderboard.js";
import {Time} from "../model/Time.js";

export interface TimeLeaderboardSerializer extends Serializer<Leaderboard<Time>> {}