import {User} from "../model/User.js";

export abstract class UserRepository {
    abstract getById(id: number): Promise<User>;
    abstract getByName(name: string): Promise<User>;
    abstract withIdExists(userId: number): Promise<boolean>;
    abstract withNameExists(username: string): Promise<boolean>
    abstract insert(user: Omit<User, 'id'>): Promise<User>;
}