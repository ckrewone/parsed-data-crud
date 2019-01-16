import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as bodyParserXml from 'express-xml-bodyparser';
import {SqliteDatabase} from "./Database/SqliteDatabase";
import * as sqlite3 from "sqlite3";
import {IDatabase} from "./Database/IDatabase";

class Main {

    private app: express.Application;

    constructor() {
        this.app = express();
    }

    public async run() {
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.text());
        this.app.use(bodyParser.raw());
        this.app.use(bodyParserXml({trim: true}));

        this.app.post('/object', this.postObjectMiddleware());
        this.app.get('/object', this.getObjectMiddleware());


        this.app.listen(3000, (err: any) => {
            if (err) console.log(err);
            else console.log('Server is running at 3000');
        });
    }


    private postObjectMiddleware(): (req: express.Request, res: express.Response, next: express.NextFunction) => any {
        return (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const db: IDatabase = new SqliteDatabase();
            db.createTable();
            const test = db.add({test: 'testujemyyy'});
            res.status(200).send(test);
        }
    }

    private getObjectMiddleware(): (req: express.Request, res: express.Response, next: express.NextFunction) => any {
        return (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const db: IDatabase = new SqliteDatabase();
            db.get(req.query.id);
        }
    }

    private test(): boolean {
        return true;
    }
}

new Main().run();
