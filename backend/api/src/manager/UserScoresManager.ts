import {UserScores} from "../model/UserScores.js";
import {Manager} from "./Manager.js";

export abstract class UserScoresManager extends Manager<UserScores>{
    abstract getById(userId: number): Promise<UserScores>;
}
