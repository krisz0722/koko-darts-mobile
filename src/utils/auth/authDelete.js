import auth from "@react-native-firebase/auth";
import throwError from "./authError";
import { CommonActions } from "@react-navigation/native";
import fetchPost from "../fetchPost";

const deleteAccount = async (navigation) => {
  try {
    navigation.navigate("authnavigator", {
      screen: "loadingscreen",
      params: { text: "deleting user..." },
    });
    const user = auth().currentUser;
    const id = auth()._user.uid;
    await user.delete();

    await fetchPost("api/deleteprofile", { id });

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
