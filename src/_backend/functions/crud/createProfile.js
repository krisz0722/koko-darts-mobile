const admin = require("firebase-admin");
const { userModel } = require("../models/modelUser");

exports.createProfile = (user) => {
  const { uid, email, photoURL } = user;
  console.log("saving profile to database..");
  return admin
    .firestore()
    .collection("users")
    .doc(uid)
    .set(userModel(uid, email, photoURL));
};
