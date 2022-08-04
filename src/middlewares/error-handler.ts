import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../Models/db.error";

function errorHandler(error: unknown, req: Request, res: Response, next: NextFunction) {
    if (error instanceof DatabaseError) {
        return res.sendStatus(StatusCodes.BAD_REQUEST);
    } else {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default errorHandler;
