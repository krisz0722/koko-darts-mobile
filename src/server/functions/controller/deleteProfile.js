const { usersCollection } = require("../app");
const updateFriendsProfiles = require("../utils/updateFriendsProfiles");

const deleteProfile = async (req, res) => {
  const { id } = req.body;

  try {
    const friendsProfiles = await usersCollection
      .where("friendsID", "array-contains", id)
      .get()
      .then((snapshot) => snapshot.docs);

    await updateFriendsProfiles(friendsProfiles, id);

    await usersCollection.doc(id).delete();

    return res.status(200).json({
      message: "user's data has been deleted successfully",
    });
  } catch (err) {
    console.log("error while deleting user: " + err);
    return res.status(400).json({ error: "error while deleting user: ", err });
  }
};

module.exports = deleteProfile;
