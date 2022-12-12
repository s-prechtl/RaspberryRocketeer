import pgPromise from "pg-promise";


export abstract class Database {
    static db = null;
    get db() {
        if (Database.db == null) {
            Database.db = pgPromise({})('postgres://postgres:postgres@db:5432/rr')
        }
        return Database.db;
    }

    static async catcher(request): Promise<any> {
        let data;
        try {
            data = await request();
        } catch (e) {
            console.log((e as Error).message)
        }
        return data;
    }


}