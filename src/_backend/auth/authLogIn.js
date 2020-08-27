import auth from "@react-native-firebase/auth";
import { getProfileByUsername, getProfileByEmail } from "../db/crudGet";
import throwError from "./authError";
import { CommonActions } from "@react-navigation/native";
import loadAppData from "./authLoadAppData";

const LogIn = async (email, password, id, navigation, reducers, credential) => {
  try {
    navigation.navigate("loadingscreen", { text: "logging in..." });

    console.log("logging in...");

    if (credential) {
      await auth().signInWithCredential(credential);
    } else {
      await auth().signInWithEmailAndPassword(email, password);
    }
    console.log("log in successful");
    if (email === id) {
      await (async () => {
        try {
          const userData = await getProfileByEmail(id);

          await loadAppData(userData, navigation, reducers);
        } catch (err) {
          console.log(err);
          alert("ERROR WHILE LOADING APPDATA IN: ", err);
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "authnavigator" }],
            }),
          );
        }
      })();
    } else {
      await (async () => {
        try {
          const userData = await getProfileByUsername(id);
          await loadAppData(userData, navigation, reducers);
        } catch (err) {
          console.log(err);
          alert("ERROR WHILE LOADING APPDATA IN: ", err);
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "authnavigator" }],
            }),
          );
        }
      })();
    }
  } catch (err) {
    console.log(err);
    return throwError(err.code, "login", navigation);
  }
};

export default LogIn;
