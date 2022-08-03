import  express,{Request, Response, NextFunction} from "express";

const app = express();
const port = 3000;

app.get("/status", (req: Request,res: Response, next: NextFunction) => {
    return res.status(200).send(({message: "Server is running"}));
});

app.listen(port, ()=> {
    console.log(`Server running on port ${port}.`);
})
