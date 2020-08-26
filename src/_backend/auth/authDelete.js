import auth from "@react-native-firebase/auth";
import deleteProfile from "../db/crudDelete";
import throwError from "./authError";
import { CommonActions } from "@react-navigation/native";

const deleteAccount = async (username, navigation) => {
  try {
    const user = auth().currentUser;
    console.log("deleting user...", user);
    await user.delete();
    console.log("user has been deleted");
    await deleteProfile(username);
    console.log("deleted from database");
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "authnavigator" }],
      }),
    );
  } catch (err) {
    throwError(err.code, "delete");
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "authnavigator" }],
      }),
    );
  }
};

export default deleteAccount;
