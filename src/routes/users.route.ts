/*
    GET /users
    GET /users/:uuid
    POST /users/:uuid
    PUT /users
    DELETE /users/:uuid
*/

import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { json } from "stream/consumers";
import userRepo from "../repositories/user.repo";

const usersRoute = Router();

const users = [
    {
        name: "Eliezer",
    },
];

usersRoute.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userRepo.getUsers();
        return res.status(StatusCodes.OK).json(users);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Houve um erro ao buscar pelos usuários T.T" });
    }
});

usersRoute.get("/users/:uuid", async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const { uuid } = req.params;
    try {
        const user = await userRepo.getUser(uuid);
        return res.status(StatusCodes.OK).send({ user });
    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND).send("User not found!");
    }
});

usersRoute.post("/users", (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    if (user) users.push(user);

    return res.status(StatusCodes.CREATED).send({ user });
});

usersRoute.put("/users/:uuid", (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const { uuid } = req.params;
    const user = req.body;
    user.uuid = uuid;

    return res.status(StatusCodes.OK).send({ userRequested: user });
});

usersRoute.delete("/users/:uuid", (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const { uuid } = req.params;

    return res.sendStatus(StatusCodes.OK);
});
export default usersRoute;
