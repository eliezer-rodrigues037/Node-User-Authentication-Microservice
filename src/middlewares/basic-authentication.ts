import { NextFunction, Request, Response } from "express";
import ForbidenError from "../Models/forbidden.error";
import userRepo from "../repositories/user.repo";

export default async function basicAuthentication(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers["authorization"];

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

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
}
