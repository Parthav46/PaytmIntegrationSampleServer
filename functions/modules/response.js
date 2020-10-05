const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.response = (req, res) => {
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
};