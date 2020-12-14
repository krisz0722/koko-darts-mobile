const { usersCollection } = require("../app");

const declineFriendRequest = async (req, res) => {
  const { acceptor, friendRequestReceived, sender } = req.body;

  try {
    await usersCollection.doc(acceptor.id).update({
      friendRequestReceived,
    });

    const senderData = await usersCollection
      .doc(sender.id)
      .get()
      .then((documentSnapshot) => {
        return documentSnapshot.data();
      });

    const senderfriendRequestSent = senderData.friendRequestSent;
    const index = senderfriendRequestSent.indexOf(acceptor);
    senderfriendRequestSent.splice(index, 1);

    await usersCollection.doc(sender.id).update({
      friendRequestSent: senderfriendRequestSent,
    });

    const updatedUserData = await usersCollection
      .doc(acceptor.id)
      .get()
      .then((data) => data.data());

    res.status(200).json({
      message: "friend request has been declined",
      data: updatedUserData,
    });
  } catch (err) {
    console.log("error while declining friend request: " + err);
    res.status(400).json({
      message: "error while declining friend request: " + err,
    });
  }
};

module.exports = declineFriendRequest;
