const admin = require("firebase-admin");

exports.getUsernameAvailability = async (username) => {
  try {
    const usersWithTheSameUsername = await admin
      .firestore()
      .where("username", "==", username)
      .get();
    return usersWithTheSameUsername.length;
  } catch (err) {
    console.log(err);
  }
};
