import {NextFunction, Request, Response} from "express";

export interface IMiddleware {
    getMiddleware(): (req: Request, res: Response, next: NextFunction) => void;
}
