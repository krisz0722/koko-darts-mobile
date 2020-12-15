const { usersCollection } = require("../app");

const updateProfile = async (req, res) => {
  const {
    matches,
    unfinishedMatches,
    friends,
    userOverall,
    key,
    inGame,
    id,
  } = req.body;
  try {
    await usersCollection.doc(id).update({
      userOverall,
      matches,
      unfinishedMatches,
      friends,
      inGame,
    });
    const updatedUserData = await usersCollection
      .doc(id)
      .get()
      .then((data) => data.data());

    res.status(200).json({
      message: "profile updated ",
      data: updatedUserData,
    });
  } catch (err) {
    console.log("error while updating profile: " + err);
    res.status(400).json({
      message: "error while updating profile: " + err,
    });
  }
};

module.exports = updateProfile;
