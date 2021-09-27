import express, { Request, Response } from "express";
import status from "http-status-codes";

let app = express();
app.post('/checksum', async (req: Request, res: Response) => {
    try {
        res.write("OK");
    } catch (ex) {
        console.error('Error in checksum api', ex.message);
        res.writeHead(status.INTERNAL_SERVER_ERROR);
    }
    res.end();
});

export default app;
