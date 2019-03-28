import * as sqlite3 from "sqlite3";
import * as uuid from "uuid";
import {IDatabase} from "./IDatabase";

export class SqliteDatabase implements IDatabase {

    protected db: sqlite3.Database;
    private readonly dbPath: string;

    constructor(dbPath: string) {
        this.dbPath = dbPath;
    }

    public createTable(): Promise<void> {
        return new Promise(async (resolve) => {
            await this.open();
            this.db.run("CREATE TABLE object (id Int, data Varchar)", (err: any) => {
                if (err) {
                    console.log("Unable to create table: " + err);
                } else {
                    console.log("Table created");
                }
                resolve();
            });
            this.close();
        });
    }

    public add(data: object): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            const id: string = uuid.v4();
            await this.open();
            this.db.run(
                `INSERT INTO object (id, data) VALUES(?, ?)`,
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
            this.close();
        });
    }

    public delete(): void {
        return undefined;
    }

    public get(id: string): Promise<object> {
        return new Promise(async (resolve, reject) => {
            await this.open();
            this.db.get(`SELECT Data FROM object WHERE id = ?`, [id], (err: any, row: any) => {
                if (err) {
                    reject(err);
                } else if (row) {
                    resolve(row);
                } else {
                    resolve({});
                }
            });
            this.close();
        });

    }

    public getAll(): Promise<object> {
        return new Promise(async (resolve, reject) => {
            await this.open();
            this.db.all(`SELECT * FROM object`, (err: any, row: any) => {
                if (err) {
                    reject(err);
                } else if (row) {
                    resolve(row);
                } else {
                    resolve({});
                }
            });
            this.close();
        });

    }

    public put(): void {

    }


    public patch(id: string, data: object): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            await this.open();
            this.db.run('UPDATE object SET data = ? WHERE id = ?', [JSON.stringify(data), id], (err: any) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
            this.close();
        });

    }

    private close(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.db.close((err: any) => {
                if (err) {
                    console.log("Unable to close database" + err);
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    private open(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.dbPath, (err: any) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }
}
