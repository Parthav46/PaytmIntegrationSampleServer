import express from "express";
import {default as test} from "./modules/test";
import config from "./config.json";


async function startServer () {
    const https = await (config.server.isHttps ? import("https") : import("http"));

    let port = config.server.port;
    let app = express();
    app.use(test);
    let server = https.createServer(app);
    server.listen(port, () => {
        console.log(`Server started! port: ${port}`);
    })
}

startServer();
