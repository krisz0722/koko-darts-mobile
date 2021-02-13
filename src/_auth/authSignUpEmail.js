import auth from "@react-native-firebase/auth";
import { firebase } from "@react-native-firebase/functions";
import throwError from "./authError";

const signUp = async (email, password, username, navigation) => {
  navigation.navigate("loadingscreen", { text: "signing up with email..." });
  try {
    //sign up user
    await auth().createUserWithEmailAndPassword(email, password);
    console.log("sign up successful");

    //update profile with username
    const updateProfileWithUsername = await firebase
      .functions()
      .httpsCallable("updateProfileWithUsername");

    updateProfileWithUsername({
      username,
    });

    //login user
    navigation.navigate("loadingscreen", { text: "logging in..." });
    await auth().signInWithEmailAndPassword(email, password);

    //loading app data
    navigation.navigate("loadingscreen", {
      load: true,
      text: "loading profile...",
    });
  } catch (err) {
    console.log(err);
    return throwError(err.code, "signUp", navigation);
  }
};

export default signUp;
