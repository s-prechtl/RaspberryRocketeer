import {UserData} from "../model/UserData.js";
import {UserDataSerializer} from "./UserDataSerializer.js";

export class UserDataManager {
    private _userData: UserData;
    private serializer: UserDataSerializer;

    constructor(data: any, serializer: UserDataSerializer) {
        this.serializer = serializer;
        this._userData = this.serializer.serialize(data);
    }

    get userData(): UserData {
        return this._userData;
    }

    set userData(value: UserData) {
        this._userData = value;
    }
}