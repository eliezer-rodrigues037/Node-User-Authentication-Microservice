import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import ForbidenError from "../Models/forbidden.error";
import JWT from "jsonwebtoken";
import basicAuthentication from "../middlewares/basic-authentication";
import bearerAuthentication from "../middlewares/bearer-authentication";

const authRoute = Router();

authRoute.post("/signin", basicAuthentication, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (!user) {
            throw new ForbidenError("Usuário não informado!");
        }

        const jwtPayload = { user: user };
        const jwtOptions = {
            subject: user?.uuid,
        };
        const secret = "secret_key";

        const jwtToken = JWT.sign(jwtPayload, secret, jwtOptions);

        return res.status(StatusCodes.OK).send(jwtToken);
    } catch (error) {
        next(error);
    }
});

authRoute.post("/validate", bearerAuthentication, (req: Request, res: Response, next: NextFunction) => {
    return res.send(StatusCodes.OK);
});

export default authRoute;
