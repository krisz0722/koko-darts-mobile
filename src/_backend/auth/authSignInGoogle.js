import auth from "@react-native-firebase/auth";
import createProfile from "../db/crudCreate";
import { getProfileByEmail } from "../db/crudGet";
import { checkUsernameAvailability } from "../db/crudCheck";
import { GoogleSignin } from "@react-native-community/google-signin";
import throwError from "./authError";
import LogIn from "./authLogIn";

const signUpGoogle = async (navigation, reducers) => {
  navigation.navigate("loadingscreen", { text: "signing in with google..." });

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
    console.log(err.code);
    return throwError(err.code, "signInGoogle", navigation);
  }
};

export default signUpGoogle;
