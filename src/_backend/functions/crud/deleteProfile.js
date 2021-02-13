const admin = require("firebase-admin");

exports.deleteProfile = (uid) => {
  try {
    console.log("deleting user from database...");
    return admin.firestore().colection("users").doc(uid).delete();
  } catch (err) {
    console.log(err);
  }
};
