import auth from "@react-native-firebase/auth";
import throwError from "./authError";
import { CommonActions } from "@react-navigation/native";

const logOut = async (navigation) => {
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
export default logOut;
