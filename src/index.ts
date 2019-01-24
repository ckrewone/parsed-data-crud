import * as bodyParser from "body-parser";
import * as express from "express";
import * as bodyParserXml from "express-xml-bodyparser";
import * as js2xmlParser from "js2xmlparser";
import {ContentTypes} from "./Constants/ContentTypes";
import {IDatabase} from "./Database/IDatabase";
import {SqliteDatabase} from "./Database/SqliteDatabase";

const DB_PATH: string = "test.db";

class Application {

    private app: express.Application;

    constructor() {
        this.app = express();
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
                console.log(req.body);
                if (typeof req.body === "string") { JSON.parse(req.body); }
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
                console.log(req.headers["content-accept"]);
                const data = JSON.parse(obj.data);
                console.log(data.body);
                switch (req.headers["content-accept"]) {
                    case ContentTypes.JSON : {
                        obj = data;
                        res.contentType(ContentTypes.JSON);
                        break;
                    }
                    case ContentTypes.XML : {
                        obj = js2xmlParser.parse("data", data, {});
                        res.contentType(ContentTypes.XML);
                        break;
                    }
                    default : {
                        obj = undefined;
                    }
                }
                res.status(200).send(obj);
                console.log(obj);
            } catch (e) {
                console.log(e);
                res.status(500).send({
                    error: JSON.stringify(e),
                    message: "Shit, you broke something dude",
                });
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
        this.app.get("/object", this.getObjectMiddleware());
    }
}

new Application().run();
