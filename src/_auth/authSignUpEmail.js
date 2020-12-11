import auth from "@react-native-firebase/auth";
import { firebase } from "@react-native-firebase/functions";
import throwError from "./authError";
const functions = firebase.app().functions("europe-west3");

const signUp = async (email, password, username, navigation) => {
  try {
    // navigation.navigate("loadingscreen", { text: "signing up with email..." });
    //sign up user
    console.log("SERGSDHRJHRTJN", email, username, password);
    await auth().createUserWithEmailAndPassword(email, password);
    // const user = auth().currentUser;

    // const { uid, displayName, photoURL } = user;
    console.log("signed up successfully");

    // const createProfile = functions.httpsCallable("createProfile");
    //
    // createProfile({
    //   uid,
    //   displayName,
    //   email,
    //   photoURL,
    // })
    //   .then((result) => result)
    //   .catch((err) => console.log(err));

    //update profile with username
    const updateProfileWithUsername = functions.httpsCallable(
      "updateProfileWithUsername",
    );

    updateProfileWithUsername({
      username,
    })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));

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
