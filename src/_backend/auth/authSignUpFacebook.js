import auth from "@react-native-firebase/auth";
import createProfile from "../db/crudCreate";
import { checkUsernameAvailability } from "../db/crudCheck";
import throwError from "./authError";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import LogIn from "./authLogIn";

const signUpFacebook = async (navigation, reducers) => {
  try {
    navigation.navigate("loadingscreen", {
      text: "signing in with facebook...",
    });
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]);

    if (result.isCancelled) {
      return throwError("auth/cancel", "signInFacebook", navigation);
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      return throwError("auth/token", "signInFacebook", navigation);
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    console.log("FACEBOOK DATA", data);
    console.log("FACEBOOK CREDENT", facebookCredential);
    console.log(
      "FACEBOOK CREDENT2",
      auth.FacebookAuthProvider.credential(data),
    );

    const responseInfoCallback = async (error, result) => {
      if (error) {
        console.log("Error fetching data: " + error);
        return throwError(error.code, "signInFacebook", navigation);
      } else {
        console.log("Success fetching data: " + result);
        console.log(result);
        const { name } = result;
        const userNameTaken = await checkUsernameAvailability(name);

        let username;
        if (userNameTaken > 0) {
          username = `${name} ${userNameTaken + 1}`;
        } else {
          username = name;
        }
        await createProfile(null, username, "");
        LogIn(null, null, username, navigation, reducers, facebookCredential);
      }
    };
    const infoRequest = new GraphRequest("/me", null, responseInfoCallback);
    await new GraphRequestManager().addRequest(infoRequest).start();
  } catch (err) {
    console.log(err.code);
    console.log(err);
    return throwError(err.code, "signInFacebook", navigation);
  }
};

export default signUpFacebook;
