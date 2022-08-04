import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import ForbidenError from "../Models/forbidden.error";
import userRepo from "../repositories/user.repo";
import JWT from "jsonwebtoken";

const authRoute = Router();

authRoute.post("/token", async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    try {
        if (!authHeader) {
            throw new ForbidenError("Credenciais não informadas!");
        }

        const [authType, token] = authHeader.split(" ");

        if (authType !== "Basic" || !token) {
            throw new ForbidenError("Autenticação inválida.");
        }

        const tokenContent = Buffer.from(token, "base64").toString("utf-8");

        const [username, password] = tokenContent.split(":");

        if (!username || !password) {
            throw new ForbidenError("Usuário ou senha não preenchido!");
        }

        const user = await userRepo.findByCredentials(username, password);

        if (!user) {
            throw new ForbidenError("Usuário ou senha inválidos!");
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

export default authRoute;
