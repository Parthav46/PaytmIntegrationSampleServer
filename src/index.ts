import express from "express";
import {default as test} from "./modules/test";
import config from "./config.json";


async function startServer () {
    let port = process.env.PORT || 3000;
    let app = express();
    app.use(test);
    app.listen(port, () => {
        console.log(`Server started! port: ${port}`);
    })
}

startServer();
