const admin = require("firebase-admin");

exports.getUser = (uid) => {
  return admin.firestore().collection("users").doc(uid).get();
};
