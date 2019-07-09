import * as e from "express";
import * as js2xmlParser from "js2xmlparser";
import {ContentTypes} from "../Constants/ContentTypes";
import {IDatabase} from "../Database/IDatabase";
import {SqliteDatabase} from "../Database/SqliteDatabase";
import {IMiddleware} from "./IMiddleware";

const DB_PATH: string = "test.db";

export class GetObjectMiddleware implements IMiddleware {
    public getMiddleware(): (req: e.Request, res: e.Response, next: e.NextFunction) => void {
        return async (req: e.Request, res: e.Response, next: e.NextFunction) => {
            const db: IDatabase = new SqliteDatabase(DB_PATH);
            try {
                let obj: any;
                if (req.query.id) {
                    obj = await db.get(req.query.id);
                } else {
                    obj = await db.getAll();
                }
                let data: any;
                if (obj.data) {
                    if (typeof obj.data === "string") {
                        data = JSON.parse(obj.data);
                    } else {
                        data = {
                            data: obj.map((el: any) => {
                                el.data = JSON.parse(el.data);
                                return el;
                            }),
                        };
                    }
                } else {
                    res.status(404).send("Object not found");
                    return;
                }
                switch (req.headers["content-accept"]) {
                    case ContentTypes.JSON : {
                        obj = data;
                        res.contentType(ContentTypes.JSON);
                        break;
                    }
                    case ContentTypes.XML : {
                        obj = js2xmlParser.parse("result", data, {});
                        res.contentType(ContentTypes.XML);
                        break;
                    }
                    default : {
                        res.status(404).send({message: "Unsuported Content-Accept"});
                        return;
                    }
                }
                res.status(200).send(obj);
            } catch (e) {
                console.log(e);
                res.status(500).send({
                    error: JSON.stringify(e),
                    message: "Shit, you broke something dude",
                });
            }
        };

    }
}
