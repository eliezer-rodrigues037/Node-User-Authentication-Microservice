import User from "../Models/user";

declare module "express-serve-static-core" {
    interface Request {
        user?: User | null;
    }
}
