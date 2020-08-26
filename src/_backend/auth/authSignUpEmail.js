import auth from "@react-native-firebase/auth";
import createProfile from "../db/crudCreate";
import { checkUsernameAvailability } from "../db/crudCheck";
import throwError from "./authError";
import { CommonActions } from "@react-navigation/native";
import LogIn from "./authLogIn";

const signUp = async (email, password, username, navigation, reducers) => {
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

export default signUp;
