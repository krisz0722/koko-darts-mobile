const admin = require("firebase-admin");

exports.updateProfileWithUsername = (uid, username) => {
  console.log("udpating profile's username...");
  return admin.firestore().collection("users").doc(uid).update({
    username,
  });
};
