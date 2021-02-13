import auth from "@react-native-firebase/auth";
import throwError from "./authError";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import { firebase } from "@react-native-firebase/functions";

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

        let username;
        const getUsernameAvailability = await firebase
          .functions()
          .httpsCallable("getUsernameAvailability");

        const usersWiththesameUsername = getUsernameAvailability({
          name,
        });
        const usernameIndex = usersWiththesameUsername.length;

        if (usernameIndex > 0) {
          username = `${name} ${usernameIndex + 1}`;

          const updateProfileWithUsername = firebase
            .functions()
            .httpsCallable("updateProfileWithUsername");

          await updateProfileWithUsername({
            username,
          });
        }
        navigation.navigate("loadingscreen", { text: "logging in..." });
        await auth().signInWithCredential(facebookCredential);
      }
    };
    const infoRequest = new GraphRequest("/me", null, responseInfoCallback);
    await new GraphRequestManager().addRequest(infoRequest).start();
    navigation.navigate("loadingscreen", { text: "loading profile..." });
  } catch (err) {
    console.log(err.code);
    console.log(err);
    return throwError(err.code, "signInFacebook", navigation);
  }
};

export default signUpFacebook;
