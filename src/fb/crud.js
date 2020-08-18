import firestore from "@react-native-firebase/firestore";
import moment from "moment";
const db = firestore();
const usersCollection = db.collection("users");

export const checkUsernameAvailability = (username) => {
  return usersCollection
    .doc(username)
    .get()
    .then((documentSnapshot) => {
      return documentSnapshot.exists;
    });
};

export const createProfile = (email, username) => {
  console.log("saving profile to database..");
  return usersCollection.doc(username).set({
    username: username,
    email: email,
    registeredOn: moment().format("MMMM Do YYYY, h:mm a"),
    img: require("../../assets/bg.png"),
    userOverall: {
      totalGames: 0,
      totalThrows: 0,
      totalScore: 0,
      wins: 0,
      losses: 0,
      winningPercentage: "N/A",
      overallAvg: "N/A",
      bestMatch: "N/A",
    },
    friends: [
      {
        key: "Jose armando",
        winsAgainst: 0,
        lossesAgainst: 0,
        legsWonAgainst: 0,
        legsLostAgainst: 0,
        bestMatchFriend: "N/A",
        bestMatchAgainst: "N/A",
        img: require("../../assets/bg.png"),
      },
      {
        key: "liszt ferenc",
        winsAgainst: 0,
        lossesAgainst: 0,
        legsWonAgainst: 0,
        legsLostAgainst: 0,
        bestMatchFriend: "N/A",
        bestMatchAgainst: "N/A",
        img: require("../../assets/bg.png"),
      },
    ],
    matches: [],
    requestReceived: [],
    requestSent: [],
    settings: {
      p1: {
        key: username,
        img: require("../../assets/bg.png"),
        gamesPlayed: 0,
        winningPercentage: 0,
        overallAvg: 0,
        bestMatch: 0,
      },
      p2: {
        key: "",
        img: "",
      },
      layout: "classic",
      legOrSet: "set",
      toWin: 3,
      legsPerSet: 3,
      startingScore: 501,
      playerToStartLeg: "p1",
      opacity: true,
      animation: true,
      background: true,
      theme: "default",
    },
  });
};

export const getProfileByUsername = (id) => {
  console.log("GETTING PROFILE", id);
  return usersCollection.doc(id).get();
};

export const getProfileByEmail = (id) => {
  console.log("GETTING PROFILE BY EMAUIL", id);
  return usersCollection.where("email", "==", id).get();
};

export const deleteProfile = (username) => {
  console.log("deleting profile from databse...");
  return usersCollection.doc(username).delete();
};

export const updateSettings = async (username, settings) => {
  try {
    console.log("saving settings...");
    await usersCollection.doc(username).update({
      settings,
    });
    console.log("settings saved!");
  } catch (err) {
    alert(err);
  }
};

export const updateMatches = async (username, matches) => {
  console.log("saving matches...", matches);
  try {
    await usersCollection.doc(username).update({
      matches,
    });
    console.log("matches updated!");
  } catch (err) {
    alert(err);
  }
};

export const updateProfile = async (
  username,
  matches,
  friends,
  opponent,
  opponentProfile,
  userOverall,
) => {
  try {
    console.log("updating profile...");
    console.log("FRIUENDS BEFORE", friends);
    const profile = friends.find((item) => item.key === opponent);
    const index = friends.indexOf(profile);

    console.log("UPDATE OVERALL", userOverall);

    friends[index] = opponentProfile;
    await usersCollection.doc(username).update({
      userOverall,
      matches,
      friends,
    });
    console.log("UPDATE FRIUENDS", friends);
    console.log("profile updated!");
  } catch (err) {
    alert(err);
  }
};

export const onStateChange = (username) => {
  usersCollection.doc(username).onSnapshot((documentSnapshot) => {
    const userData = documentSnapshot.data();
  });
};
