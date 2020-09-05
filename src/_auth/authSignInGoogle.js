import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-community/google-signin";
import throwError from "./authError";
import { firebase } from "@react-native-firebase/functions";

const signUpGoogle = async (navigation) => {
  try {
    navigation.navigate("loadingscreen", { text: "signing in with google..." });
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

    const getUserData = await firebase.functions().httpsCallable("getUserData");
    const userData = getUserData({
      email,
    });

    let username;

    if (!userData) {
      const getUsernameAvailability = await firebase
        .functions()
        .httpsCallable("getUsernameAvailability");

      const usersWiththesameUsername = getUsernameAvailability({
        name,
      });
      const usernameIndex = usersWiththesameUsername.length;

      if (usernameIndex > 0) {
        username = `${name} ${usernameIndex + 1}`;

        const updateProfileWithUsername = firebase
          .functions()
          .httpsCallable("updateProfileWithUsername");

        await updateProfileWithUsername({
          username,
        });
      }
    }

    navigation.navigate("loadingscreen", { text: "logging in..." });
    await auth().signInWithCredential(googleCredential);

    navigation.navigate("loadingscreen", { text: "loading profile..." });
  } catch (err) {
    console.log(err);
    return throwError(err.code, "signInGoogle", navigation);
  }
};

export default signUpGoogle;
