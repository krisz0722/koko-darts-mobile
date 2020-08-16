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
  dispatchUserData,
  dispatchSettings,
  dispatchInGameSettings,
  dispatchGameData,
  setSelectedTheme,
  setAnimation,
  setBackground,
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
          LogIn(
            email,
            password,
            username,
            navigation,
            dispatchUserData,
            dispatchSettings,
            dispatchInGameSettings,
            dispatchGameData,
            setSelectedTheme,
            setAnimation,
            setBackground,
          );
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
      navigation.navigate("authnavigator");
    });
};

export const LogIn = (
  email,
  password,
  id,
  navigation,
  dispatchUserData,
  dispatchSettings,
  dispatchInGameSettings,
  dispatchGameData,
  setSelectedTheme,
  setAnimation,
  setBackground,
) => {
  console.log("logging in...");
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("log in successful");
      if (email === id) {
        (async () => {
          try {
            const userData = await getProfileByEmail(id).then(
              (querySnapshot) => {
                return querySnapshot.docs[0].data();
              },
            );
            await loadAppData(
              userData,
              navigation,
              dispatchUserData,
              dispatchSettings,
              dispatchInGameSettings,
              dispatchGameData,
              setSelectedTheme,
              setAnimation,
              setBackground,
            );
          } catch (err) {
            alert(err);
          }
        })();
      } else {
        (async () => {
          try {
            const userData = await getProfileByUsername(id).then(
              (documentSnapshot) => {
                return documentSnapshot.data();
              },
            );
            await loadAppData(
              userData,
              navigation,
              dispatchUserData,
              dispatchSettings,
              dispatchInGameSettings,
              dispatchGameData,
              setSelectedTheme,
              setAnimation,
              setBackground,
            );
          } catch (err) {
            alert(err);
          }
        })();
      }
    })
    .catch((err) => {
      alert(err);
    });
};

export const loadAppData = async (
  userData,
  navigation,
  dispatchUserData,
  dispatchSettings,
  dispatchInGameSettings,
  dispatchGameData,
  setSelectedTheme,
  setAnimation,
  setBackground,
) => {
  console.log("creating profile...");
  const settings = userData.settings;

  await dispatchUserData({
    type: "CREATE_PROFILE",
    value: userData,
  });
  console.log("PROFILE CREATED");

  console.log("loading theme...");
  await setSelectedTheme(settings.theme);
  await setAnimation(settings.animation);
  await setBackground(settings.background);
  console.log("THEME");

  console.log("loading settingscontext...");
  await dispatchSettings({
    type: "LOAD_SETTINGS",
    value: settings,
  });
  console.log("SETTINGS CONTEXT LOADED");
  console.log("loading ingame settingscontext...");
  await dispatchInGameSettings({
    type: "LOAD_INGAME_SETTINGS",
    value: settings,
  });
  console.log("INGAME SETTINGS CONTEXT LOADED");
  console.log("loading gameData...");
  await dispatchGameData({
    type: "LOAD_SETTINGS",
    value: settings,
  });
  console.log("GAMEDATA LOADED");

  console.log("navigating");
  navigation.navigate("homenavigator");
};

export const deleteAccount = (username, navigation) => {
  const user = auth().currentUser;
  console.log("deleting user...", user);
  user.delete().then(() => {
    console.log("user has been deleted");
    deleteProfile(username).then(() => {
      console.log("deleted from database");
      navigation.navigate("authnavigator");
    });
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
