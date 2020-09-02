import auth from "@react-native-firebase/auth";
import createProfile from "../db/crudCreate";
import throwError from "./authError";
import LogIn from "./authLogIn";

const signUp = async (email, password, username, navigation, reducers) => {
  navigation.navigate("loadingscreen", { text: "signing up with email..." });
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    console.log("sign up successful");
    await createProfile(email, username, "");
    LogIn(email, password, username, navigation, reducers);
  } catch (err) {
    console.log(err);
    return throwError(err.code, "signUp", navigation);
  }
};

export default signUp;
