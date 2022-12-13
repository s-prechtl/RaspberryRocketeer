import {Leaderboard} from "../model/Leaderboard.js";
import {Manager} from "./Manager.js";
import {HighscoreLeaderboardSerializer} from "../serializer/HighscoreLeaderboardSerializer.js";

export class HighscoreLeaderboardManager implements Manager<Leaderboard<number>>{
    private _content: Leaderboard<number>;
    private _serializer: HighscoreLeaderboardSerializer;

    constructor(rawData: any, serializer: HighscoreLeaderboardSerializer) {
        this.serializer = serializer;
        this._content = this.serializer.serialize(rawData);
    }

    //region getter&setter
    get content() {
        return this._content;
    }

    set content(value: Leaderboard<number>) {
        this._content = value;
    }

    get serializer() {
        return this._serializer;
    }

    set serializer(value: HighscoreLeaderboardSerializer) {
        this._serializer = value;
    }
    //endregion

}