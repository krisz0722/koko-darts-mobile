const { usersCollection } = require("../app");

const updateProfile = async (req, res) => {
  const {
    username,
    matches,
    unfinishedMatches,
    friends,
    userOverall,
    key,
    inGame,
  } = req.body;
  try {
    await usersCollection.doc(username).update({
      userOverall,
      matches,
      unfinishedMatches,
      friends,
      inGame,
    });
    res.status(200).json({
      message: "profile updated ",
    });
  } catch (err) {
    console.log("error while updating profile: " + err);
    res.status(400).json({
      message: "error while updating profile: " + err,
    });
  }
};

module.exports = updateProfile;
