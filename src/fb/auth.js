import auth from "@react-native-firebase/auth";
import {
  deleteProfile,
  getProfileByUsername,
  getProfileByEmail,
  checkUsernameAvailability,
  createProfile,
} from "./crud";

export const signUp = async (
  email,
  password,
  username,
  navigation,
  reducers,
) => {
  const userNameTaken = await checkUsernameAvailability(username);
  if (userNameTaken) {
    return alert("username is taken");
  } else {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      console.log("sign up successful");
      await createProfile(email, username);
      LogIn(email, password, username, navigation, reducers);
    } catch (err) {
      alert("ERROR WHILE SIGNING UP: ", err);
    }
  }
};

export const logOut = async (navigation) => {
  try {
    console.log("logging out...");
    await auth().signOut();
    console.log("logged out");
    navigation.navigate("authnavigator", { screen: "login" });
  } catch (err) {
    alert("ERROR WHILE LOGGING OUT: ", err);
  }
};

export const LogIn = async (email, password, id, navigation, reducers) => {
  try {
    console.log("logging in...");
    await auth().signInWithEmailAndPassword(email, password);
    console.log("log in successful");
    if (email === id) {
      await (async () => {
        try {
          const userData = await getProfileByEmail(id).then((querySnapshot) => {
            console.log("QUERY SNAPSHOTS", querySnapshot.docs);
            return querySnapshot.docs[0].data();
          });
          await loadAppData(userData, navigation, reducers);
        } catch (err) {
          alert("ERROR WHILE LOADING APPDATA IN: ", err);
        }
      })();
    } else {
      await (async () => {
        try {
          const userData = await getProfileByUsername(id).then(
            (documentSnapshot) => {
              return documentSnapshot.data();
            },
          );
          await loadAppData(userData, navigation, reducers);
        } catch (err) {
          alert("ERROR WHILE LOADING APPDATA IN: ", err);
        }
      })();
    }
  } catch (err) {
    alert("ERROR WHILE LOGGING IN: ", err);
  }
};

export const loadAppData = async (userData, navigation, reducers) => {
  const { user, settings, game, theme, animation, background } = reducers;
  const lastMatch = userData.matches[0];
  const friends = userData.friends;

  const lastOpponent = lastMatch ? lastMatch.opponent : null;

  const getSettings = () => {
    if (lastOpponent) {
      const opponentProfile = userData.friends.find(
        (item) => item.key === lastOpponent,
      );
      return { ...userData.settings, p2: opponentProfile };
    } else {
      return userData.settings;
    }
  };
  const userSettings = getSettings();
  const userMatches = userData.matches;

  console.log("creating profile...");
  await user({
    type: "CREATE_PROFILE",
    value: userData,
  });
  await theme(userSettings.theme);
  await animation(userSettings.animation);
  await background(userSettings.background);
  await settings({
    type: "LOAD_SETTINGS",
    value: userSettings,
  });
  if (userMatches.length === 0 || lastMatch.status === "finished") {
    await game({
      type: "LOAD_SETTINGS",
      value: userSettings,
    });
  } else {
    await game({
      type: "CONTINUE_MATCH",
      value: userMatches[0],
    });
  }

  navigation.navigate("homenavigator");
};

export const deleteAccount = async (username, navigation) => {
  try {
    const user = auth().currentUser;
    console.log("deleting user...", user);
    await user.delete();
    console.log("user has been deleted");
    await deleteProfile(username);
    console.log("deleted from database");
    navigation.navigate("authnavigator");
  } catch (err) {
    alert("ERROR WHILE DELETING ACCOUNT: ", err);
  }
};

export const forgotPassword = async (email) => {
  try {
    await auth().sendPasswordResetEmail(email);
  } catch (err) {
    console.log("ERROR", err);
  }
};

export const onAuthStateChange = () => {
  auth().onAuthStateChanged((user) => {
    console.log("STATACHANGE", user);
  });
};
