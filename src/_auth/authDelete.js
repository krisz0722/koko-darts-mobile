import auth from "@react-native-firebase/auth";
import throwError from "./authError";
import { CommonActions } from "@react-navigation/native";

const deleteAccount = async (username, navigation) => {
  try {
    navigation.navigate("authnavigator", {
      screen: "loadingscreen",
      params: { text: "deleting user..." },
    });
    const user = auth().currentUser;
    console.log("deleting user...", user);
    await user.delete();
    console.log("user has been deleted");
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "authnavigator" }],
      }),
    );
  } catch (err) {
    return throwError(err.code, "delete", navigation);
  }
};

export default deleteAccount;
