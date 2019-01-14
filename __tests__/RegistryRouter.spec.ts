import 'jest';
import * as request from 'supertest';
import * as express from 'express';
import {RegistryRouter} from "../src/Router/RegistryRouter";
import {IRegistryRouter} from "../src/Router/IRegistryRouter";

let registryRouter: IRegistryRouter;
let app: express.Application;

beforeEach(async() => {
    registryRouter = new RegistryRouter();
    app = express().use(await registryRouter.getRouter());
});

describe('POST /object tests', () => {
    it('POST /object should retunt invalid data Error', async () => {
        const result = await request(app).post('/object');
        expect(result.status).toEqual(400);
        expect(result.text).toEqual('Invalid Data');
    });
});


