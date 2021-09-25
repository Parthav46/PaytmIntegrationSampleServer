import express, {Request, Response} from "express";

let app = express();
app.get('/', (req: Request, res: Response) => {
    res.contentType("application/json");
    res.write(JSON.stringify({"status": "OK"}));
    res.end();
});

export default app;