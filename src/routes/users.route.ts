/*
    GET /users
    GET /users/:uuid
    POST /users/:uuid
    PUT /users
    DELETE /users/:uuid
*/

import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import userRepo from "../repositories/user.repo";

const usersRoute = Router();

const users = [
    {
        name: "Eliezer",
    },
];

usersRoute.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepo.getUsers();

    return res.status(StatusCodes.OK).json(users);
});

usersRoute.get("/users/:uuid", (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const { uuid } = req.params;

    return res.status(StatusCodes.OK).send({ uuid });
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
