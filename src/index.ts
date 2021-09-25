import express from "express";
import {default as test} from "./modules/test";
import config from "./config.json";


async function startServer () {

    let port = config.server.port;
    let app = express();
    app.use(test);
    app.listen(port, () => {
        console.log(`Server started! port: ${port}`);
    })
}

startServer();
