const functions = require('firebase-functions');
const admin = require('firebase-admin');
const test = require('./modules/test');
const response = require('./modules/response');
const checksum = require('./modules/checksum');

admin.initializeApp(functions.config().firebase);

exports.test = functions.https.onRequest((req,res) => test.test(req, res));

exports.response = functions.https.onRequest((req,res) => response.response(req, res));

exports.checksum = functions.https.onRequest((req,res) => checksum.checksum(req, res));