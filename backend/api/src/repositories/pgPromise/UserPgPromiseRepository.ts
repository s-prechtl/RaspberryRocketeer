import {UserRepository} from "../UserRepository.js";
import {User} from "../../model/User.js";
import {Database} from "../../Database.js";

export class UserPgPromiseRepository extends UserRepository {
    async getById(id: number): Promise<User> {
        const raw = await Database.db.oneOrNone(
            'SELECT * FROM "user" WHERE id = $1;', id
        );
        return this.serialize(raw);
    }

    async getByName(name: string): Promise<User> {
        const raw = await Database.db.oneOrNone(
            'SELECT * FROM "user" WHERE name = $1;', name
        );
        return this.serialize(raw);
    }

    async withIdExists(id: number): Promise<boolean> {
        const response = await Database.db.oneOrNone(
            'SELECT count(*) AS row_count FROM "user" WHERE id = $1;', id
        );
        return response.row_count > 0;
    }

    async withNameExists(name: string): Promise<boolean> {
        const response = await Database.db.oneOrNone(
            'SELECT count(*) AS row_count FROM "user" WHERE name = $1;', name
        );
        return response.row_count > 0;
    }

    async insert(user: Omit<User, 'id'>): Promise<User> {
        const raw = await Database.db.oneOrNone(
            'INSERT INTO "user" (name) VALUES (${name}) RETURNING *;', user
        );
        return this.serialize(raw);
    }

    protected serialize(raw: any): User {
        return {
            id: raw.id,
            name: raw.name
        };
    }
}