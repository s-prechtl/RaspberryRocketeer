import {Manager} from "./Manager.js";
import {Leaderboard} from "../model/Leaderboard.js";
import {Time} from "../model/Time.js";
import {TimeLeaderboardSerializer} from "../serializer/TimeLeaderboardSerializer.js";
import {TimeLeaderboardPgPromiseSerializer} from "../serializer/pgpromise/TimeLeaderboardPgPromiseSerializer.js";

export class TimeLeaderboardManager implements Manager<Leaderboard<Time>> {
    private _content: Leaderboard<Time>;
    private _serializer: TimeLeaderboardPgPromiseSerializer

    constructor(data: any, serializer: TimeLeaderboardSerializer) {
        this._serializer = serializer;
        this._content = this._serializer.serialize(data);
    }

    //region getter&setter
    get content() {
        return this._content;
    }

    set content(value: Leaderboard<Time>) {
        this._content = value;
    }

    get serializer(): TimeLeaderboardPgPromiseSerializer {
        return this._serializer;
    }

    set serializer(value: TimeLeaderboardPgPromiseSerializer) {
        this._serializer = value;
    }
    //endregion

}