import {Rest} from "@/model/Rest";

export class User {
    id?: number;
    name?: string;


    constructor(id: number, name: string) {
        this.name = name;
    }

    static async getByName(name: string): Promise<User> {
        let res: Response = await fetch(Rest.URL + '/user/' + name, {method: 'GET'});

        return await res.json();
    }

    static async create(name: string): Promise<User> {
        let body = {
            name: name
        };
        let header = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };

        let res: Response = await fetch( Rest.URL + '/user/register', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: header,
        });
        return await res.json();
    }
}