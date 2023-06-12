import { NextFunction, Request, Response } from "express";

type controllerFunc<T = any> = (req: Request, res: Response, next: NextFunction) => Promise<T>;

export default controllerFunc