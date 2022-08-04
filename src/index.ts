import express from "express";
import bearerAuthentication from "./middlewares/bearer-authentication";
import errorHandler from "./middlewares/error-handler";
import authRoute from "./routes/auth.route";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rotas
app.use(statusRoute);
app.use("/auth", authRoute);
app.use(usersRoute);

//Error handlers
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
