import firestore from "@react-native-firebase/firestore";

const db = firestore();
const usersCollection = db.collection("users");

export const checkUsernameAvailability = (username) => {
  return usersCollection
    .doc(username)
    .get()
    .then((documentSnapshot) => {
      console.log("SNAPSHOTS", documentSnapshot.exists);
      return documentSnapshot.exists;
    });
};

export const createProfile = (email, username) => {
  console.log("saving profile to database..");
  return usersCollection.doc(username).set({
    username: username,
    email: email,
    registeredOn: new Date(),
    img: require("../../assets/bg.png"),
    overall: {
      gamesPlayed: 0,
      winningPercentage: 0,
      overallAvg: 0,
      bestMatch: 0,
    },
    friends: [],
    matches: [],
    requestReceived: [],
    requestSent: [],
    settings: {
      p1: {
        key: username,
        img: require("../../assets/bg.png"),
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

export const getProfileByUsername = (id, bool = false) => {
  console.log("GETTING PROFILE", id);
  return usersCollection.doc(id).get();
};

export const getProfileByEmail = (id, bool = false) => {
  console.log("GETTING PROFILE BY EMAUIL", id);
  return usersCollection.where("email", "==", id).get();
};

export const deleteProfile = (username) => {
  console.log("deleting profile from databse...");
  return usersCollection.doc(username).delete();
};

export const updateSettings = (username, settings) => {
  console.log("saving settings...");
  usersCollection
    .doc(username)
    .update({
      settings,
    })
    .then(() => {
      console.log("settings saved!");
    });
};

export const onStateChange = (username) => {
  usersCollection.doc(username).onSnapshot((documentSnapshot) => {
    const userData = documentSnapshot.data();
    console.log("User data: ", userData);
  });
};
