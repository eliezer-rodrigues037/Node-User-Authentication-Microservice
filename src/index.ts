import  express,{Request, Response, NextFunction} from "express";
import { StatusCodes } from "http-status-codes";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";

const app = express();
const port = 3000;

app.use(express.json())

app.use(statusRoute);
app.use(usersRoute);

app.listen(port, ()=> {
    console.log(`Server running on port ${port}.`);
})
