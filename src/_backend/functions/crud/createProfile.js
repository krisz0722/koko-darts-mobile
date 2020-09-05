const admin = require("firebase-admin");
const { userModel } = require("../models/modelUser");

exports.createProfile = (user) => {
  const { uid, displayName, email, photoURL } = user;
  console.log("saving profile to database..");
  return admin
    .firestore()
    .collection("users")
    .doc(uid)
    .set(userModel(uid, displayName, email, photoURL));
};
