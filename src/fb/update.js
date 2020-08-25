import firestore from "@react-native-firebase/firestore";
import { getProfileByUsername } from "./get";

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
