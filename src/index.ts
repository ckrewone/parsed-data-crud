import * as bodyParser from "body-parser";
import * as express from "express";
import * as bodyParserXml from "express-xml-bodyparser";
import {IDatabase} from "./Database/IDatabase";
import {SqliteDatabase} from "./Database/SqliteDatabase";


const DB_PATH: string = "test.db";


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
            const db: IDatabase = new SqliteDatabase(DB_PATH);
            await db.createTable();
            try {
                const addedId = await db.add(req.body);
                res.status(200).send({id: addedId});
            } catch (e) {
                console.log(e);
                res.status(500).send({
                    message: "Shit, you broke something dude",
                    error: JSON.stringify(e),
                });
            }
        };
    }

    private getObjectMiddleware(): (req: express.Request, res: express.Response, next: express.NextFunction) => any {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const db: IDatabase = new SqliteDatabase(DB_PATH);
            try {
                let obj: any;
                if (req.query.id) {
                    obj = await db.get(req.query.id);
                } else {
                    obj = await db.getAll();
                }
                res.status(200).send(obj);
                console.log(obj);
            } catch (e) {
                console.log(e);
                res.status(500).send({
                    message: "Shit, you broke something dude",
                    error: JSON.stringify(e),
                });
            }
        };
    }

    private test(): boolean {
        return true;
    }
}

new Main().run();
