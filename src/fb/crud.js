import firestore from "@react-native-firebase/firestore";
import { friendModel, userModel } from "./models";
const db = firestore();
export const usersCollection = db.collection("users");

export const checkUsernameAvailability = async (username) => {
  try {
    return await usersCollection
      .where("username", "==", username)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.size;
      });
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE CHECKING USERNAME AVAILABILITY: ", err);
  }
};

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

export const getUsers = async () => {
  try {
    return usersCollection.get();
  } catch (err) {
    alert("ERROR WHILE GETTING USERS: ", err);
  }
};

export const getProfileByUsername = async (id) => {
  try {
    console.log("GETTING PROFILE", id);
    const user = await usersCollection
      .doc(id)
      .get()
      .then((data) => data.data());

    return user;
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE FETCHING PROFILE BY USERNAME: ", err);
  }
};

export const getProfileByEmail = async (id) => {
  try {
    console.log("GETTING PROFILE BY EMAUIL", id);
    const user = await usersCollection
      .where("email", "==", id)
      .get()
      .then((snapshot) => snapshot.docs[0].data());
    console.log("USERRRR", user);

    return user;
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE FETCHING PROFILE BY EMAIL: ", err);
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

export const updateSettings = async (username, settings) => {
  try {
    console.log("saving settings...");
    await usersCollection.doc(username).update({
      settings,
    });
    console.log("settings saved!");
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE SAVING SETTINGS: ", err);
  }
};

export const updateUnfinishedMatches = async (
  p1,
  p2,
  p1Match,
  p2Match,
  type,
  key,
  inGame,
) => {
  const p1Profile = await getProfileByUsername(p1.key);
  const p2Profile = await getProfileByUsername(p2.key);

  const p1Matches = p1Profile.unfinishedMatches;
  const p2Matches = p2Profile.unfinishedMatches;

  if (type === "add") {
    p1Matches.unshift(p1Match);
    p2Matches.unshift(p2Match);
  } else {
    const p1MatchIndex = p1Matches.indexOf(
      p1Matches.find((item) => item.key === key),
    );
    const p2MatchIndex = p2Matches.indexOf(
      p2Matches.find((item) => item.key === key),
    );

    p1Matches[p1MatchIndex] = p1Match;
    p2Matches[p2MatchIndex] = p2Match;
  }

  try {
    await usersCollection.doc(p1.key).update({
      unfinishedMatches: p1Matches,
      inGame,
      inGameKey: key,
    });

    await usersCollection.doc(p2.key).update({
      unfinishedMatches: p2Matches,
      inGame,
      inGameKey: key,
    });
    console.log("matches updated!");
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE SAVING MATCHES: ", err);
  }
};

export const updatefriendRequestSent = async (username, newRequests) => {
  try {
    const friendRequestSent = await usersCollection
      .doc(username)
      .get()
      .then((documentSnapshot) => {
        return documentSnapshot.data().friendRequestSent.concat(newRequests);
      });
    console.log("updating sent requests...");
    await usersCollection.doc(username).update({
      friendRequestSent,
    });
    console.log("profile updated!");
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE UPDATING SENT REQUESTS: ", err);
  }
};

export const updatefriendRequestReceived = async (
  usernameRequested,
  username,
  img,
) => {
  try {
    const friendRequestReceived = await usersCollection
      .doc(usernameRequested)
      .get()
      .then((documentSnapshot) => {
        return documentSnapshot.data().friendRequestReceived;
      });
    friendRequestReceived.unshift({ username, img });
    console.log("updating received request...");
    await usersCollection.doc(usernameRequested).update({
      friendRequestReceived,
    });
    console.log("profile updated!");
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE UPDATING RECEIVED REQUESTS: ", err);
  }
};

export const updateProfile = async (
  username,
  matches,
  unfinishedMatches,
  friends,
  userOverall,
  key,
  inGame,
) => {
  try {
    console.log("updating profile...");
    await usersCollection.doc(username).update({
      userOverall,
      matches,
      unfinishedMatches,
      friends,
      inGame,
    });
    console.log("profile updated!");
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE UPDATING PROFILE: ", err);
  }
};

export const updateStatus = async (p1, p2, inGame) => {
  try {
    console.log("updating profile...");
    await usersCollection.doc(p1).update({
      inGame,
    });
    await usersCollection.doc(p2).update({
      inGame,
    });
    console.log("profile updated!");
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE UPDATING PROFILE: ", err);
  }
};

export const checkOpponentsStatus = async (opponent) => {
  try {
    const opponentProfile = await usersCollection
      .doc(opponent)
      .get()
      .then((documentSnapshot) => documentSnapshot.data());
    const status = opponentProfile.inGame;

    return status;
  } catch (err) {
    console.log(err);
    alert("ERROR: ", err);
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
