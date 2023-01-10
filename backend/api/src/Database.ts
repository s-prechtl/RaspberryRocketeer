import pgPromise from "pg-promise";


export abstract class Database {
    private static _db = null;
    static get db() {
        if (Database._db == null) {
            Database._db = pgPromise({})('postgres://postgres:postgres@db:5432/rr')
        }
        return Database._db;
    }
}