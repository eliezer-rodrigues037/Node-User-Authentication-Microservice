import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../Models/db.error";
import ForbidenError from "../Models/forbidden.error";

function errorHandler(error: unknown, req: Request, res: Response, next: NextFunction) {
    if (error instanceof DatabaseError) {
        return res.sendStatus(StatusCodes.BAD_REQUEST);
    } else if (error instanceof ForbidenError) {
        return res.status(StatusCodes.FORBIDDEN).send(error.message);
    } else {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default errorHandler;
