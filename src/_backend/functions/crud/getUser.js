const admin = require("firebase-admin");

exports.getUser = async (uid) => {
  try {
    const user = await admin.firestore().collection("users").doc(uid).get();
    const userData = user.data();

    return userData;
  } catch (err) {
    console.log(err);
  }
};
