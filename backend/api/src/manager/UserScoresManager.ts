import {UserScores} from "../model/UserScores.js";
import { Serializer } from "../serializer/Serializer.js";
import {UserScoresSerializer} from "../serializer/UserScoresSerializer.js";
import {Manager} from "./Manager.js";

export class UserScoresManager implements Manager<UserScores> {
    private _content: UserScores;
    private _serializer: UserScoresSerializer;

    constructor(rawData: any, serializer: UserScoresSerializer) {
        this.serializer = serializer;
        this._content = this.serializer.serialize(rawData);
    }

    //region getter&setter
    get content() {
        return this._content;
    }

    set content(value: UserScores) {
        this._content = value;
    }

    get serializer() {
        return this._serializer
    }

    set serializer(value: Serializer<UserScores>) {
        this._serializer = value
    }
    //endregion

}