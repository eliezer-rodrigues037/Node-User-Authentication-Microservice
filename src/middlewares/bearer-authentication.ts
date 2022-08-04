import { NextFunction, Request, Response } from "express";
import ForbidenError from "../Models/forbidden.error";
import JWT from "jsonwebtoken";

export default function bearerAuthentication(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader) {
            throw new ForbidenError("Credenciais não informadas!");
        }

        const [authType, token] = authHeader.split(" ");

        if (authType !== "Bearer" || !token) {
            throw new ForbidenError("Autenticação inválida.");
        }

        const tokenPayload = JWT.verify(token, "secret_key");

        if (typeof tokenPayload !== "object" || !tokenPayload.user) throw new ForbidenError("Token inválido");

        const user = tokenPayload.user;

        req.user = user;

        return next();
    } catch (error) {
        next(error);
    }
}
