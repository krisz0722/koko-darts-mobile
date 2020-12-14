const { usersCollection } = require("../app");
const friendModel = require("../models/modelFriend");

const acceptFriendRequest = async (req, res) => {
  const { acceptor, friendRequestReceived, sender } = req.body;
  try {
    const acceptorData = await usersCollection
      .doc(acceptor.id)
      .get()
      .then((documentSnapshot) => {
        return documentSnapshot.data();
      });

    const acceptorFriendModel = friendModel(
      acceptor.id,
      acceptor.username,
      acceptor.img,
    );

    const senderData = await usersCollection
      .doc(sender.id)
      .get()
      .then((documentSnapshot) => {
        return documentSnapshot.data();
      });

    const senderfriendRequestSent = senderData.friendRequestSent;
    const senderFriendModel = friendModel(
      sender.id,
      sender.username,
      sender.img,
    );

    const acceptorFriends = acceptorData.friends;
    const acceptorFriendsID = acceptorData.friendsID;
    acceptorFriends.unshift(senderFriendModel);
    acceptorFriendsID.unshift(sender.id);

    await usersCollection.doc(acceptor.id).update({
      friendRequestReceived,
      friends: acceptorFriends,
      friendsID: acceptorFriendsID,
    });

    const index = senderfriendRequestSent.indexOf(acceptor);
    senderfriendRequestSent.splice(index, 1);
    const senderFriends = senderData.friends;
    const senderFriendsID = senderData.friendsID;
    senderFriends.unshift(acceptorFriendModel);
    senderFriendsID.unshift(acceptor.id);

    await usersCollection.doc(sender.id).update({
      friendRequestSent: senderfriendRequestSent,
      friends: senderFriends,
      friendsID: senderFriendsID,
    });

    const updatedUserData = await usersCollection
      .doc(acceptor.id)
      .get()
      .then((data) => data.data());

    return res.status(200).json({
      message: "friend request has been accepted",
      data: updatedUserData,
    });
  } catch (err) {
    console.log("error while accepting friend request: " + err);
    return res.status(400).json({
      message: "error while accepting friend request: " + err,
    });
  }
};

module.exports = acceptFriendRequest;
