import firestore from "@react-native-firebase/firestore";
import moment from "moment";
const db = firestore();
const usersCollection = db.collection("users");

export const checkUsernameAvailability = async (username) => {
  try {
    return await usersCollection
      .doc(username)
      .get()
      .then((documentSnapshot) => {
        return documentSnapshot.exists;
      });
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE CHECKING USERNAME AVAILABILITY: ", err);
  }
};

export const createProfile = async (email, username) => {
  try {
    console.log("saving profile to database..");
    return await usersCollection.doc(username).set({
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
        winningPercentage: 0,
        overallAvg: 0,
        bestMatch: 0,
      },
      friends: [
        {
          key: "Jose armando",
          winsAgainst: 0,
          lossesAgainst: 0,
          bestMatchFriend: 0,
          bestMatchAgainst: 0,
          totalThrowsAgainst: 0,
          totalThrowsFriend: 0,
          totalScoreAgainst: 0,
          totalScoreFriend: 0,
          avgAgainst: 0,
          avgFriend: 0,
          img: require("../../assets/bg.png"),
        },
        {
          key: "liszt ferenc",
          winsAgainst: 0,
          lossesAgainst: 0,
          bestMatchFriend: 0,
          bestMatchAgainst: 0,
          totalThrowsAgainst: 0,
          totalThrowsFriend: 0,
          totalScoreAgainst: 0,
          totalScoreFriend: 0,
          avgAgainst: 0,
          avgFriend: 0,
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
    return await usersCollection.doc(id).get();
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE FETCHING PROFILE BY USERNAME: ", err);
  }
};

export const getProfileByEmail = async (id) => {
  try {
    console.log("GETTING PROFILE BY EMAUIL", id);
    return await usersCollection.where("email", "==", id).get();
  } catch (err) {
    alert("ERROR WHILE FETCHING PROFILE BY EMAIL: ", err);
  }
};

export const deleteProfile = async (username) => {
  try {
    console.log("deleting profile from databse...");
    return await usersCollection.doc(username).delete();
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

export const updateMatches = async (username, matches) => {
  console.log("saving matches...", matches);
  try {
    await usersCollection.doc(username).update({
      matches,
    });
    console.log("matches updated!");
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE SAVING MATCHES: ", err);
  }
};

export const updateProfile = async (
  username,
  matches,
  friends,
  userOverall,
) => {
  try {
    console.log("updating profile...");
    await usersCollection.doc(username).update({
      userOverall,
      matches,
      friends,
    });
    console.log("profile updated!");
  } catch (err) {
    console.log(err);
    alert("ERROR WHILE UPDATING PROFILE: ", err);
  }
};

export const onStateChange = (username) => {
  usersCollection.doc(username).onSnapshot((documentSnapshot) => {
    const userData = documentSnapshot.data();
  });
};
