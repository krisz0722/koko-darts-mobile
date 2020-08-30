import auth from "@react-native-firebase/auth";
import createProfile from "../db/crudCreate";
import { checkUsernameAvailability } from "../db/crudCheck";
import throwError from "./authError";
import LogIn from "./authLogIn";

const signUp = async (email, password, username, navigation, reducers) => {
  navigation.navigate("loadingscreen", { text: "signing up with email..." });

  const userNameTaken = await checkUsernameAvailability(username);
  console.log("USERNAMETAKEN", userNameTaken);

  if (userNameTaken > 0) {
    return throwError("usernametaken", "signUp", navigation);
  } else {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      console.log("sign up successful");
      await createProfile(email, username, "");
      LogIn(email, password, username, navigation, reducers);
    } catch (err) {
      console.log(err);
      return throwError(err.code, "signUp", navigation);
    }
  }
};

export default signUp;
