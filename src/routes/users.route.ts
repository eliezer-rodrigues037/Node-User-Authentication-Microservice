/*
    GET /users
    GET /users/:uuid
    POST /users/:uuid
    PUT /users
    DELETE /users/:uuid
*/

import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import bearerAuthentication from "../middlewares/bearer-authentication";
import userRepo from "../repositories/user.repo";

const usersRoute = Router();

usersRoute.use(bearerAuthentication);

usersRoute.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    console.log("Header: ", req.headers["authorization"]);
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
        if (user.uuid) {
            return res.status(StatusCodes.OK).send(user);
        } else {
            return res.status(StatusCodes.NOT_FOUND).send(`User not found for id: ${uuid}`);
        }
    } catch (error) {
        next(error);
    }
});

usersRoute.post("/users", async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;

    try {
        const uuid = await userRepo.createUser(newUser);

        return res.status(StatusCodes.CREATED).send({ uuid });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
});

usersRoute.put("/users/:uuid", async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const { uuid } = req.params;
    const user = req.body;
    user.uuid = uuid;

    try {
        await userRepo.editUser(user);
        return res.sendStatus(StatusCodes.OK);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
});

usersRoute.delete("/users/:uuid", async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const { uuid } = req.params;

    try {
        await userRepo.remove(uuid);
        return res.sendStatus(StatusCodes.OK);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
});
export default usersRoute;
