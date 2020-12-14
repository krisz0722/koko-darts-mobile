const { usersCollection } = require("../app");
const userModel = require("../models/modelUser");

const createProfile = async (req, res) => {
  const { uid, user, username, social } = req.body;

  const photoUrl =
    social === "google"
      ? user.photo
      : social === "facebook"
      ? `http://graph.facebook.com/${user.id}/picture?type=square`
      : "https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg";

  try {
    const usersRef = await usersCollection.get();
    let users = [];
    usersRef.forEach((doc) => users.push(doc.data()));
    let index = 0;
    let newUsername = username;

    const checkUsername = (username) =>
      users.find((user) => user.username === username);

    const createNewUsername = () => {
      if (checkUsername(newUsername)) {
        index++;
        newUsername = username + index;
        createNewUsername();
      } else {
        return newUsername;
      }
    };

    if (social) {
      createNewUsername();
    } else {
      if (checkUsername(username)) {
        console.log("username is not available");
        return res
          .status(400)
          .json({ message: "username is not available, choose another one" });
      }
    }

    const userData = userModel(newUsername, photoUrl, uid);
    await usersCollection.doc(uid).set(userData);

    res.status(200).json({
      message: "successfully added to the database",
      data: userData,
    });
  } catch (err) {
    console.log("error while creating user profile in db: " + err);
    res.status(400).json({ error: err });
  }
};

module.exports = createProfile;
