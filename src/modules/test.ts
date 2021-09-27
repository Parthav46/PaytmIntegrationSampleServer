import express, {Request, Response} from "express";
import FirestoreUtils from "../utils/FirestoreUtils";

let app = express();
app.get('/', (req: Request, res: Response) => {
    res.contentType("application/json");
    res.write(JSON.stringify({"status": "OK"}));
    res.end();
});

app.get('/flag', async (req: Request, res: Response) => {
    let utils = FirestoreUtils.GetInstance();
    let value = await utils.get('test/doc');
    res.end(JSON.stringify(value));
})

app.get('/setFlag', async (req: Request, res: Response) => {
    let value = parseInt(req.query.val.toString(), 10);
    if (!isNaN(value)) {
        let utils = FirestoreUtils.GetInstance();
        await utils.update('test/doc', {flag1: value, "test.doc": {flag: true}});
        res.end('OK');
    }
    res.writeHead(403);
    res.end("require query param 'val' must be of type number");
})

export default app;