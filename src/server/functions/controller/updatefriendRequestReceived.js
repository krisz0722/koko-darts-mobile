const { usersCollection } = require("../app");

const updatefriendRequestReceived = async (req, res) => {
  const { checkedProfiles, username, img, id } = req.body;

  try {
    checkedProfiles.forEach((checkedProfile) => {
      usersCollection
        .doc(checkedProfile.id)
        .get()
        .then((data) => {
          const userData = data.data();
          const friendRequestReceived = userData.friendRequestReceived;
          friendRequestReceived.unshift({ username, img, id });
          usersCollection.doc(checkedProfile.id).update({
            friendRequestReceived,
          });
          return;
        })
        .catch((err) => console.log(err));
    });

    res.status(200).json({
      message: "friend request has been received ",
    });
  } catch (err) {
    console.log("error while receiving request: " + err);
    res.status(400).json({
      message: "error while receiving request: " + err,
    });
  }
};

module.exports = updatefriendRequestReceived;
