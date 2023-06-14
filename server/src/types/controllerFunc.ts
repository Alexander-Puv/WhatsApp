import { NextFunction, Request, Response } from "express";

type controllerFunc = (req: Request, res: Response, next: NextFunction) => Promise<any>

export default controllerFunc