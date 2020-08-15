import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const db = firestore();
const usersCollection = db.collection("users");

const checkUsernameAvailability = (username) => {
  console.log("UESRNAME", username);
  return usersCollection
    .doc(username)
    .get()
    .then((documentSnapshot) => {
      console.log("SNAPSHOTS", documentSnapshot.exists);
      return documentSnapshot.exists;
    });
};

const createProfile = (email, username) => {
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
    },
  });
};

const getProfile = (username) => {
  console.log("GETTING PROFILE", username);
  return usersCollection.doc(username).get();
};

const deleteProfile = (username) => {
  console.log("deleting profile from databse...");
  usersCollection
    .doc(username)
    .delete()
    .then(() => {
      console.log("User deleted from database!");
    });
};

export const signUp = async (
  email,
  password,
  username,
  navigation,
  dispatchUserData,
) => {
  const userNameTaken = await checkUsernameAvailability(username);
  if (userNameTaken) {
    return alert("username is taken");
  } else {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("sign up successful");
        createProfile(email, username).then(() => {
          LogIn(email, password, username, navigation, dispatchUserData);
        });
      })
      .catch((err) => {
        alert(err);
      });
  }
};

export const logOut = (navigation) => {
  console.log("logging out...");
  auth()
    .signOut()
    .then(() => {
      console.log("logged out");
      navigation.navigate("welcome");
    });
};

export const LogIn = (
  email,
  password,
  username,
  navigation,
  dispatchUserData,
) => {
  console.log("logging in...");
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("log in successful");
      getProfile(username).then((documentSnapshot) => {
        const userData = documentSnapshot.data();
        console.log(userData);
        dispatchUserData({ type: "CREATE_PROFILE", value: userData });
        navigation.navigate("homenavigator");
      });
    })
    .catch((err) => {
      alert(err);
    });
};

export const deleteAccount = (username, navigation) => {
  const user = auth().currentUser;
  console.log("deleting user...", user);
  user.delete().then(() => {
    console.log("user has been deleted");
    deleteProfile(username);
    navigation.navigate("welcome");
  });
};

export const forgotPassword = (email) => {
  auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log("email  sent");
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};

export const onAuthStateChange = () => {
  auth().onAuthStateChanged((user) => {
    console.log("STATACHANGE", user);
  });
};
