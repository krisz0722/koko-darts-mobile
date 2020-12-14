import auth from "@react-native-firebase/auth";
import throwError from "./authError";
import fetchCheckUserData from "../fetchCheckUserData";

const signUp = async (email, password, username, navigation) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    const user = auth().currentUser;

    navigation.navigate("loadingscreen", { text: "logging in..." });
    await auth().signInWithEmailAndPassword(email, password);

    const userData = await fetchCheckUserData(
      { ...user, name: username },
      navigation,
      false,
    );

    navigation.navigate("loadingscreen", {
      load: true,
      text: "loading profile...",
      userData,
    });
  } catch (err) {
    return throwError(err.code, "signUp", navigation);
  }
};

export default signUp;
