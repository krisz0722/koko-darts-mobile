const admin = require("firebase-admin");

exports.checkOpponentsStatus = async (opponent) => {
  try {
    const opponentProfile = await admin
      .firestore()
      .collection("users")
      .where("username", "==", opponent)
      .get();

    const inGame = opponentProfile.inGame;

    return inGame;
  } catch (err) {
    console.log(err);
  }
};
