import auth from "@react-native-firebase/auth";
import deleteProfile from "../db/crudDeleteAccount";
import throwError from "./authError";
import { CommonActions } from "@react-navigation/native";

const deleteAccount = async (username, navigation) => {
  try {
    navigation.navigate("authnavigator", {
      screen: "loadingscreen",
      params: { text: "logging out..." },
    });
    const user = auth().currentUser;
    console.log("deleting user...", user);
    await user.delete();
    console.log("user has been deleted");
    navigation.navigate("loadingscreen", { text: "deleting profile data..." });
    await deleteProfile(username);
    console.log("deleted from database");
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
