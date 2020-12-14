const functionsGlobal = require("firebase-functions");
const functions = functionsGlobal.region("europe-west3");
// const admin = require("firebase-admin");
const app = require("./app");

// const serviceAccount = require("./serviceaccount.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://kokodarts-native.firebaseio.com",
// });

exports.app = functions.https.onRequest(app);
