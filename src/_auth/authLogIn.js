import auth from "@react-native-firebase/auth";
import throwError from "./authError";

const LogIn = async (email, password, navigation) => {
  try {
    navigation.navigate("loadingscreen", { text: "logging in..." });

    console.log("logging in...");

    await auth().signInWithEmailAndPassword(email, password);

    console.log("log in successful");

    navigation.navigate("loadingscreen", { text: "loading profile..." });
  } catch (err) {
    console.log(err);
    return throwError(err.code, "login", navigation);
  }
};

export default LogIn;
