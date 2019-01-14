import * as express from 'express';

export interface IRegistryRouter {
    getRouter():  Promise<express.Router>;
}
