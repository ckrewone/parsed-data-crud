import {IDatabase} from "./IDatabase";
import * as sqlite3 from 'sqlite3';
import * as uuid from 'uuid';

export class SqliteDatabase implements IDatabase {

    protected db: sqlite3.Database;

    constructor() {
        this.db = new sqlite3.Database(':memory:', (err) => {
            console.log(err ? 'Unable to open database.' : 'Connected to database.')
        });

    }

    public createTable(): void {
        this.db.run('CREATE TABLE object (Id Int, Data Varchar)', (err) => {
            console.log(err ? 'Unable to create Table' : 'Table created')
        });
    }

    public add(data: object): string {
        const id = uuid.v4();

        this.db.run(
            `INSERT INTO object (Id, Data) VALUES(?, ?)`,
            [id, JSON.stringify(data)],
            (err) => {
                if (err) console.log("Duppa" + err);
            }
        );
        return id;
    }

    public delete(): void {
        return undefined;
    }

    public get(id: string): object {
        this.db.get(`SELECT Data FROM object WHERE Id=${id}`, (err, row) => {
            if (err) console.log('dupaaa');
            else {
                console.log(row);
            }
        });
        return {}
    }

    public update(): void {
    }

    public close(): void {
        this.db.close(err => console.log(err ? 'Unable to close the database' : 'Close the database connection'));
    }
}
