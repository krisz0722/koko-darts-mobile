const admin = require("firebase-admin");

exports.getUsersArray = async (arr) => {
  try {
    const friendsProfiles = await arr.map((item) => {
      admin
        .firestore()
        .collection("users")
        .where("username", "==", item.username)
        .get();

      return friendsProfiles;
    });
  } catch (err) {
    console.log(err);
  }
};
