import {UserData} from "../model/UserData.js";

export interface UserDataSerializer {
    serialize(data: any): UserData,
    deserialize(userData: UserData): any,
}