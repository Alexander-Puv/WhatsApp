import { NextFunction, Request, Response } from "express";

type ControllerFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export default ControllerFunction