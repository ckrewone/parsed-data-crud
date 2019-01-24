import * as sqlite3 from "sqlite3";
import * as uuid from "uuid";
import {IDatabase} from "./IDatabase";

export class SqliteDatabase implements IDatabase {

    protected db: sqlite3.Database;

    constructor() {
        this.db = new sqlite3.Database("./test.db", (err: any) => {
            console.log(err ? "Unable to open database." + err : "Connected to database.");
        });

    }

    public createTable(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.run("CREATE TABLE object (Id Int, Data Varchar)", (err: any) => {
                if (err) {
                    reject(err);
                    console.log("Unable to create table");
                } else {
                    console.log("Table created");
                    resolve();
                }

            });
        });
    }

    public add(data: object): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const id: string = uuid.v4();
            this.db.run(
                `INSERT INTO object (Id, Data) VALUES(?, ?)`,
                [id, JSON.stringify(data)],
                (err: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log("Row added");
                        resolve(id);
                    }
                },
            );
        });
    }

    public delete(): void {
        return undefined;
    }

    public get(id: string): Promise<object> {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT * FROM object WHERE Id = ?`, [id], (err: any, row: any) => {
                if (err) {
                    reject(err);
                } else if (row) {
                    resolve(row);
                } else {
                    resolve({});
                }
            });
        });

    }

    public update(): void {
    }

    public close(): void {
        this.db.close((err) => console.log(err ? "Unable to close the database" : "Close the database connection"));
    }
}
