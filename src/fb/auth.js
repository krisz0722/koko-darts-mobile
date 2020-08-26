import auth from "@react-native-firebase/auth";
import { deleteProfile, createProfile } from "./crud";
import { getProfileByUsername, getProfileByEmail } from "./get";
import { checkUsernameAvailability } from "./check";
import { GoogleSignin } from "@react-native-community/google-signin";
import throwError from "./authError";
import { CommonActions } from "@react-navigation/native";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { GraphRequest, GraphRequestManager } from "react-native-fbsdk";

export const signUpFacebook = async (navigation, reducers) => {
  try {
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]);

    if (result.isCancelled) {
      throw "User cancelled the login process";
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw "Something went wrong obtaining access token";
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    console.log("FACEBOOK DATA", data);
    console.log("FACEBOOK CREDENT", facebookCredential);
    console.log(
      "FACEBOOK CREDENT2",
      auth.FacebookAuthProvider.credential(data),
    );

    const responseInfoCallback = async (error, result) => {
      if (error) {
        console.log("Error fetching data: " + error);
      } else {
        console.log("Success fetching data: " + result);
        console.log(result);
        const { name } = result;
        const userNameTaken = await checkUsernameAvailability(name);

        let username;
        if (userNameTaken > 0) {
          username = `${name} ${userNameTaken + 1}`;
        } else {
          username = name;
        }
        await createProfile(null, username, "");
        LogIn(null, null, username, navigation, reducers, facebookCredential);
      }
    };
    const infoRequest = new GraphRequest("/me", null, responseInfoCallback);
    await new GraphRequestManager().addRequest(infoRequest).start();
  } catch (err) {
    console.log(err);
    throwError(err.code, "signInGoogle");
  }
};

export const signUpGoogle = async (navigation, reducers) => {
  try {
    await GoogleSignin.configure({
      webClientId:
        "559933853025-veb4b0dkpcmf28bkule0je5o7eqt58cr.apps.googleusercontent.com",
    });
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const {
      idToken,
      user: { name, photo, email },
    } = userInfo;
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userNameTaken = await checkUsernameAvailability(name);
    let userData = await getProfileByEmail(email);
    userData = userData ? userData : null;

    if (userData) {
      console.log("alreadt signed up with this email");
      LogIn(
        email,
        null,
        userData.username,
        navigation,
        reducers,
        googleCredential,
      );
    } else {
      let username;
      if (userNameTaken > 0) {
        username = `${name} ${userNameTaken + 1}`;
      } else {
        username = name;
      }
      await createProfile(email, username, photo);
      LogIn(email, null, username, navigation, reducers, googleCredential);
    }
  } catch (err) {
    console.log(err);
    throwError(err.code, "signInGoogle");
  }
};

export const signUp = async (
  email,
  password,
  username,
  navigation,
  reducers,
) => {
  const userNameTaken = await checkUsernameAvailability(username);
  console.log("USERNAMETAKEN", userNameTaken);

  if (userNameTaken > 0) {
    return throwError("usernametaken", "signUp");
  } else {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      console.log("sign up successful");
      await createProfile(email, username, "");
      LogIn(email, password, username, navigation, reducers);
    } catch (err) {
      console.log(err);
      throwError(err.code, "signUp");
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "authnavigator" }],
        }),
      );
    }
  }
};

export const logOut = async (navigation) => {
  try {
    console.log("logging out...");
    await auth().signOut();
    console.log("logged out");
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "authnavigator" }],
      }),
    );
  } catch (err) {
    throwError(err.code, "logout");
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "authnavigator" }],
      }),
    );
  }
};

export const LogIn = async (
  email,
  password,
  id,
  navigation,
  reducers,
  credential,
) => {
  try {
    console.log("logging in...");

    if (credential) {
      await auth().signInWithCredential(credential);
    } else {
      await auth().signInWithEmailAndPassword(email, password);
    }
    console.log("log in successful");
    if (email === id) {
      await (async () => {
        try {
          const userData = await getProfileByEmail(id);

          await loadAppData(userData, navigation, reducers);
        } catch (err) {
          console.log(err);
          alert("ERROR WHILE LOADING APPDATA IN: ", err);
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "authnavigator" }],
            }),
          );
        }
      })();
    } else {
      await (async () => {
        try {
          const userData = await getProfileByUsername(id);
          await loadAppData(userData, navigation, reducers);
        } catch (err) {
          console.log(err);
          alert("ERROR WHILE LOADING APPDATA IN: ", err);
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "authnavigator" }],
            }),
          );
        }
      })();
    }
  } catch (err) {
    console.log(err);
    throwError(err.code, "login");
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "authnavigator" }],
      }),
    );
  }
};

export const loadAppData = async (userData, navigation, reducers) => {
  const { user, settings, game, theme, animation, background } = reducers;
  const lastMatch = userData.matches[0];
  const friends = userData.friends;

  const lastOpponent = lastMatch ? lastMatch.opponent : null;

  const authUser = auth().currentUser;
  console.log("USERDATA SETTINGS", userData.settings);
  console.log("AUTHUSER", authUser._user);

  const img = authUser._user.photoURL;

  const getSettings = () => {
    const p1 = { ...userData.settings.p1, img };
    console.log("P!SETTINGS", p1);
    if (lastOpponent) {
      const opponentProfile = userData.friends.find(
        (item) => item.key === lastOpponent,
      );
      return { ...userData.settings, p1, p2: opponentProfile };
    } else {
      return { ...userData.settings, p1 };
    }
  };
  const userSettings = getSettings();
  const userMatches = userData.matches;

  console.log("creating profile...");
  await user({
    type: "CREATE_PROFILE",
    value: { ...userData, img },
  });
  await theme(userSettings.theme);
  await animation(userSettings.animation);
  await background(userSettings.background);
  await settings({
    type: "LOAD_SETTINGS",
    value: userSettings,
  });
  if (userMatches.length === 0 || lastMatch.status === "finished") {
    console.log("GAME LOAD SETTINGS ", userSettings);
    await game({
      type: "LOAD_SETTINGS_AFTER_LOGIN",
      value: userSettings,
    });
  } else {
    await game({
      type: "CONTINUE_MATCH",
      value: userMatches[0],
    });
  }
  navigation.navigate("homedrawernavigator");
};

export const deleteAccount = async (username, navigation) => {
  try {
    const user = auth().currentUser;
    console.log("deleting user...", user);
    await user.delete();
    console.log("user has been deleted");
    await deleteProfile(username);
    console.log("deleted from database");
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "authnavigator" }],
      }),
    );
  } catch (err) {
    throwError(err.code, "delete");
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "authnavigator" }],
      }),
    );
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
