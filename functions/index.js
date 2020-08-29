const functions = require('firebase-functions');
const admin = require('firebase-admin');
const checksum_lib = require('./checksum');

admin.initializeApp(functions.config().firebase);

exports.test = functions.https.onRequest((req, res) => {
    //Test https function
    res.writeHead(200);
    res.write("OK");
    res.end();
});

exports.response = functions.https.onRequest((req, res) => {
    var body = req.body;
    copy = JSON.parse(JSON.stringify(body));
    delete copy.CHECKSUMHASH;
    if(checksum_lib.verifychecksum(copy, functions.config().paytm.key, body.CHECKSUMHASH)) {
        admin.firestore().collection("txns").doc(body.ORDERID).get().then((snap) => {
            if(snap.exists) {
                admin.firestore().collection("txns").doc(body.ORDERID).update({
                    status: parseInt(body.RESPCODE),
                    txnId: body.TXNID,
                    txnDate: body.TXNDATE
                });
            }
            return 0;
        }).catch((err) => {
            console.log(err);
            return 1;
        });
    }
    res.writeHead(200);
    res.write("OK");
    res.end();
});

exports.checksum = functions.https.onRequest((req, res) => {
    var body = "";
    body += req.rawBody;

    jsonBody = JSON.parse(body);
    customerID = jsonBody.userInfo.custId;
    orderID = jsonBody.orderId;

    admin.database().ref("users/" + customerID).once("value").then((snap) => {
        if(snap.exists()) {
            txns = snap.child("txns").val();
            if(txns === null) txns = [orderID];
            else txns.push(orderID);
            snap.child('txns').ref.set(txns);
            admin.firestore().collection("txns").doc(orderID).set({
                id: orderID,
                user: customerID,
                amount: jsonBody.txnAmount,
                status: 0
            });
            checksum_lib.genchecksumbystring(body, functions.config().paytm.key, (err, checksum) => {
                if (err !== undefined) console.log("genchecksumbystring callback (index.js) error");
                response = {
                    checksum: checksum
                };
                res.writeHead(200);
                res.write(JSON.stringify(response));
                res.end();
            });
            return 0;
        } else {
            res.writeHead(200);
            res.write('{"checksum": "",\n "error": "User not found in database"}');
            console.log('{"checksum": "",\n "error": "User not found in database"}');
            res.end();
            return 1;
        }
    }).catch((err) => {
        console.log(err);
        return 1;
    });
});