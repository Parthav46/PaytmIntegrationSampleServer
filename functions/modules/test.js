const functions = require('firebase-functions');

export default functions.https.onRequest((req, res) => {
    //Test https function
    res.writeHead(200);
    res.write("OK");
    res.end();
});