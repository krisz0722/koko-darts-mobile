const { usersCollection } = require("../app");

const updatefriendRequestSent = async (req, res) => {
  const { uid, newRequests } = req.body;
  try {
    const friendRequestSent = await usersCollection
      .doc(uid)
      .get()
      .then((documentSnapshot) =>
        documentSnapshot.data().friendRequestSent.concat(newRequests),
      );

    await usersCollection.doc(uid).update({
      friendRequestSent,
    });

    res.status(200).json({
      message: "friend request has been sent ",
    });
  } catch (err) {
    console.log("error while sending request: " + err);
    res.status(400).json({
      message: "error while sending request: " + err,
    });
  }
};

module.exports = updatefriendRequestSent;
