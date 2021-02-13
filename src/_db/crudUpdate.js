import firestore from "@react-native-firebase/firestore";
import navigatingIn from "./navigatingIn";
import navigatingOut from "./navigatingOut";

const db = firestore();
export const usersCollection = db.collection("users");

export const updateProfile = async (
  username,
  matches,
  unfinishedMatches,
  friends,
  userOverall,
  key,
  inGame,
  navigation,
  navigationType,
) => {
  try {
    navigatingIn(navigation, navigationType);

    console.log("updating profile...");
    await usersCollection.doc(username).update({
      userOverall,
      matches,
      unfinishedMatches,
      friends,
      inGame,
    });

    navigatingOut(navigation, navigationType);

    console.log("profile updated!");
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE UPDATING PROFILE: ", err);
  }
};

export const updateStatus = async (
  p1,
  p2,
  inGame,
  navigation,
  navigationType,
) => {
  try {
    navigatingIn(navigation, navigationType);

    console.log("updating profile...");
    await usersCollection.doc(p1).update({
      inGame,
    });
    await usersCollection.doc(p2).update({
      inGame,
    });

    navigatingOut(navigation, navigationType);
    console.log("profile updated!");
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE UPDATING PROFILE: ", err);
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
