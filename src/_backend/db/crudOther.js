import firestore from "@react-native-firebase/firestore";
import { friendModel } from "./modelUser";

const db = firestore();
export const usersCollection = db.collection("users");

export const acceptFriendRequest = async (
  acceptor,
  friendRequestReceived,
  sender,
) => {
  try {
    const acceptorData = await usersCollection
      .doc(acceptor)
      .get()
      .then((documentSnapshot) => {
        return documentSnapshot.data();
      });

    const acceptorImg = acceptorData.img;
    const acceptorFriendModel = friendModel(acceptor, acceptorImg);

    const senderData = await usersCollection
      .doc(sender)
      .get()
      .then((documentSnapshot) => {
        return documentSnapshot.data();
      });

    const senderfriendRequestSent = senderData.friendRequestSent;
    const senderImg = senderData.img;
    const senderFriendModel = friendModel(sender, senderImg);

    const acceptorFriends = acceptorData.friends;
    acceptorFriends.unshift(senderFriendModel);

    await usersCollection.doc(acceptor).update({
      friendRequestReceived,
      friends: acceptorFriends,
    });

    const index = senderfriendRequestSent.indexOf(acceptor);
    senderfriendRequestSent.splice(index, 1);
    const senderFriends = senderData.friends;
    senderFriends.unshift(acceptorFriendModel);

    await usersCollection.doc(sender).update({
      friendRequestSent: senderfriendRequestSent,
      friends: senderFriends,
    });
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE ACEPTIN REQUEST: ", err);
  }
};

export const declineFriendRequest = async (
  acceptor,
  friendRequestReceived,
  sender,
) => {
  await usersCollection.doc(acceptor).update({
    friendRequestReceived,
  });

  const senderData = await usersCollection
    .doc(sender)
    .get()
    .then((documentSnapshot) => {
      return documentSnapshot.data();
    });

  const senderfriendRequestSent = senderData.friendRequestSent;
  const index = senderfriendRequestSent.indexOf(acceptor);
  senderfriendRequestSent.splice(index, 1);

  await usersCollection.doc(sender).update({
    friendRequestSent: senderfriendRequestSent,
  });
};

export const onStateChange = (username) => {
  usersCollection.doc(username).onSnapshot((doc) => {
    const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    console.log(source, " data: ", doc.data());
  });
};
