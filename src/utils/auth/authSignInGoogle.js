import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-community/google-signin";
import throwError from "./authError";
import fetchCheckUserData from "../fetchCheckUserData";

const signUpGoogle = async (navigation) => {
  try {
    navigation.navigate("loadingscreen", { text: "signing in with google..." });
    await GoogleSignin.configure({
      webClientId:
        "559933853025-veb4b0dkpcmf28bkule0je5o7eqt58cr.apps.googleusercontent.com",
    });
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const { idToken, user } = userInfo;
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    navigation.navigate("loadingscreen", {
      text: "logging in...",
    });
    await auth().signInWithCredential(googleCredential);

    const userData = await fetchCheckUserData(user, navigation, "google");

    navigation.navigate("loadingscreen", {
      text: "loading profile GOOGLE...",
      load: true,
      userData: userData,
    });
  } catch (err) {
    console.log(err);
    return throwError(err.code, "signInGoogle", navigation);
  }
};

export default signUpGoogle;
