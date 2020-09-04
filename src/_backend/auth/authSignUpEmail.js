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
    await auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.log(err);
    return throwError(err.code, "signUp", navigation);
  }
};

export default signUp;
