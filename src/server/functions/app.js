const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceaccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kokodarts-native.firebaseio.com",
});

exports.usersCollection = admin.firestore().collection("users");
exports.namesCollection = admin.firestore().collection("userrnames");

const bodyParser = require("body-parser");
const apiRouter = require("./router");

const app = express();
app.use(cors({ origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(apiRouter);

module.exports = app;
