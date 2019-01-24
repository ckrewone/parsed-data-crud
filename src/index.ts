import * as bodyParser from "body-parser";
import * as express from "express";
import * as bodyParserXml from "express-xml-bodyparser";
import {IDatabase} from "./Database/IDatabase";
import {SqliteDatabase} from "./Database/SqliteDatabase";

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

        this.app.post("/object", this.postObjectMiddleware());
        this.app.get("/object", this.getObjectMiddleware());


        this.app.listen(3000, (err: any) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Server is running at 3000");
            }
        });
    }


    private postObjectMiddleware(): (req: express.Request, res: express.Response, next: express.NextFunction) => any {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const db: IDatabase = new SqliteDatabase();
            try {
                await db.createTable();
                const test = await db.add({test: "testujemyyy"});
                res.status(200).send(test);
            } catch (e) {
                console.log(e);
                res.status(500).send("duppa");
            } finally {
                db.close();
            }
        };
    }

    private getObjectMiddleware(): (req: express.Request, res: express.Response, next: express.NextFunction) => any {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const db: IDatabase = new SqliteDatabase();
            try {
                const obj = await db.get(req.query.id);
                res.status(200).send(obj);
                console.log(obj);
            } catch (e) {
                console.log(e);
            } finally {
                db.close();
            }
        };
    }

    private test(): boolean {
        return true;
    }
}

new Main().run();
