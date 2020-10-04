const functions = require('firebase-functions');
const admin = require('firebase-admin');
const test = require('./modules/test');
const response = require('./modules/response');
const checksum = require('./modules/checksum');

admin.initializeApp(functions.config().firebase);

exports.test = test;

exports.response = response;

exports.checksum = checksum;