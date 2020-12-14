import auth from "@react-native-firebase/auth";
import throwError from "./authError";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import fetchCheckUserData from "../fetchCheckUserData";

const signUpFacebook = async (navigation) => {
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

    const responseInfoCallback = async (error, result) => {
      if (error) {
        return throwError(error.code, "signInFacebook", navigation);
      } else {
        navigation.navigate("loadingscreen", { text: "logging in..." });
        await auth().signInWithCredential(facebookCredential);

        const userData = await fetchCheckUserData(
          result,
          navigation,
          "facebook",
        );
        navigation.navigate("loadingscreen", {
          text: "loading profile FACEBOOK...",
          load: true,
          userData: userData,
        });
      }
    };

    const infoRequest = new GraphRequest("/me", null, responseInfoCallback);
    await new GraphRequestManager().addRequest(infoRequest).start();
  } catch (err) {
    return throwError(err.code, "signInFacebook", navigation);
  }
};

export default signUpFacebook;
