import * as bodyParser from "body-parser";
import * as express from "express";
import * as bodyParserXml from "express-xml-bodyparser";
import * as js2xmlParser from "js2xmlparser";
import {ContentTypes} from "./Constants/ContentTypes";
import {IDatabase} from "./Database/IDatabase";
import {SqliteDatabase} from "./Database/SqliteDatabase";
import {IMiddleware} from "./Middlewares/IMiddleware";
import {GetObjectMiddleware} from "./Middlewares/GetObjectMiddleware";

const DB_PATH: string = "test.db";

class Application {
    protected getObjectMiddleware: IMiddleware;
    private app: express.Application;

    constructor() {
        this.app = express();
        this.getObjectMiddleware = new GetObjectMiddleware();
    }

    public async run() {
        this.bodyParseMiddlewares();
        this.routesRegister();
        this.startServer(3000);
    }


    private postObjectMiddleware(): (req: express.Request, res: express.Response, next: express.NextFunction) => any {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const db: IDatabase = new SqliteDatabase(DB_PATH);
            await db.createTable();
            try {
                if (typeof req.body === "string") {
                    JSON.parse(req.body);
                }
                const addedId = await db.add(req.body);
                res.status(200).send({id: addedId});
            } catch (e) {
                console.log(e);
                res.status(500).send({
                    error: JSON.stringify(e),
                    message: "Shit, you broke something dude",
                });
            }
        };
    }

    private patchObjectMiddleware(): (req: express.Request, res: express.Response, next: express.NextFunction) => any {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const db: IDatabase = new SqliteDatabase(DB_PATH);
            try {
                await db.patch(req.query.id, {data: req.body});
            } catch (e) {
                console.log("Unable to patch object", e);
                res.status(500).send({
                    error: JSON.stringify(e),
                    message: "Shit, you broke something dude",
                });
            }
            res.status(200).send("ok");
        };
    }

    private deleteObjectMiddleware(): (req: express.Request, res: express.Response, next: express.NextFunction) => any {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (req.query.id) {
                const db: IDatabase = new SqliteDatabase(DB_PATH);
                try {
                    await db.delete(req.query.id);
                    res.status(200).send({data: "deleted"});
                } catch (e) {
                    res.status(500).send({data: "Error", trace: e});
                }
            } else {
                res.status(400).send({data: "Id not found"});
            }
        };
    }

    private bodyParseMiddlewares(): void {
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.text());
        this.app.use(bodyParser.raw());
        this.app.use(bodyParserXml({trim: true}));
    }

    private startServer(port: number): void {
        this.app.listen(port, (err: any) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Server is running at 3000");
            }
        });
    }

    private routesRegister(): void {
        this.app.post("/object", this.postObjectMiddleware());
        this.app.get("/object", this.getObjectMiddleware.getMiddleware());
        this.app.patch("/object", this.patchObjectMiddleware());
        this.app.delete("/object", this.deleteObjectMiddleware());
    }
}

new Application().run();
