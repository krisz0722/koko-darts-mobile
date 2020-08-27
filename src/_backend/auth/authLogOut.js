import auth from "@react-native-firebase/auth";
import throwError from "./authError";
import { CommonActions } from "@react-navigation/native";

const logOut = async (navigation) => {
  navigation.navigate("authnavigator", {
    screen: "loadingscreen",
    params: { text: "logging out..." },
  });

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
    return throwError(err.code, "logout", navigation);
  }
};
export default logOut;
