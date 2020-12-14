import auth from "@react-native-firebase/auth";
import throwError from "./authError";
import fetchPost from "../fetchPost";

const LogIn = async (email, password, navigation) => {
  try {
    navigation.navigate("loadingscreen", { text: "logging in..." });
    await auth().signInWithEmailAndPassword(email, password);
    const uid = auth()._user.uid;

    const userData = await fetchPost("api/getuserdata", {
      uid,
    });

    navigation.navigate("loadingscreen", {
      text: "loading profile LOGIN...",
      load: true,
      userData,
    });
  } catch (err) {
    console.log(err);
    return throwError(err.code, "login", navigation);
  }
};

export default LogIn;
