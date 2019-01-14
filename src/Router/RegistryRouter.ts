import {IRegistryRouter} from "./IRegistryRouter";
import * as express from 'express';
import {PostObjectMiddleware} from "../Middleware/PostObjectMiddleware";

export class RegistryRouter implements IRegistryRouter {
    protected router: express.Router;

    constructor() {
        this.router = express.Router();
    }

    public getRouter(): Promise<express.Router> {
        return new Promise(async(resolve, reject) => {
            if(await this.register()) resolve(this.router);
        });
    }

    private register(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.router.post('/object', new PostObjectMiddleware().getMiddleware());

            resolve(true);
        });
    }

    private dataValidate(data: any): void {
        if (!data) throw new Error('Invalid Data');
    }

}
