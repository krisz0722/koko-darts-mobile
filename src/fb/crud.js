import firestore from "@react-native-firebase/firestore";
import { friendModel, userModel } from "./models";
import { getProfileByUsername } from "./get";

const db = firestore();
export const usersCollection = db.collection("users");

export const createProfile = async (email, username, photo) => {
  try {
    console.log("saving profile to database..");
    return await usersCollection
      .doc(username)
      .set(userModel(username, email, photo));
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE CREATING PROFILE: ", err);
  }
};

export const deleteProfile = async (username) => {
  try {
    console.log("deleting profile from database...");

    const userProfile = await getProfileByUsername(username);
    const usersFriends = userProfile.friends;
    console.log("USERSFRIENDS", usersFriends);
    usersFriends.forEach((friend) => {
      if (friend.key !== "GUEST") {
        (async () => {
          try {
            const profile = await getProfileByUsername(friend.key);
            const friends = profile.friends;
            console.log("FRIENDPROFIE", profile);
            console.log("FRIENDS", friends);
            const findProfile = friends.find((item) => item.key === username);
            const index = friends.indexOf(findProfile);
            findProfile["key"] = "DELETED USER";
            friends[index] = findProfile;

            console.log("newfriendarra", friends);
            await usersCollection.doc(friend.key).update({
              friends,
            });
          } catch (err) {
            console.log(err);
            alert(err);
          }
        })();
      }
    });
    await usersCollection.doc(username).delete();
    console.log("deleted from database");
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE DELETING ACCOUNT: ", err);
  }
};

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
    var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    console.log(source, " data: ", doc.data());
  });
};
