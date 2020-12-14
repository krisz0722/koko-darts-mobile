import { CommonActions } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import throwError from "./authError";

const loadAppData = async (userData, navigation, reducers) => {
  const { theme, game, settings, user } = reducers();

  try {
    const lastMatch = userData.matches ? userData.matches[0] : null;
    const lastOpponent = lastMatch ? lastMatch.opponent : null;
    const img = auth().currentUser._user.photoURL;

    const getSettings = () => {
      const p1 = { ...userData.settings.p1, img };
      if (lastOpponent) {
        const opponentProfile = userData.friends.find(
          (item) => item.key === lastOpponent,
        );
        return { ...userData.settings, p1, p2: opponentProfile };
      } else {
        return { ...userData.settings, p1 };
      }
    };
    const userSettings = getSettings();
    const userMatches = userData.matches;

    await user({
      type: "CREATE_PROFILE",
      value: { ...userData, img },
    });
    await theme({
      type: "LOAD_THEME",
      value: {
        selectedTheme: userSettings.theme,
        animation: userSettings.animation,
        background: userSettings.background,
      },
    });
    await settings({
      type: "LOAD_SETTINGS",
      value: userSettings,
    });
    if (userMatches.length === 0 || lastMatch.status === "finished") {
      await game({
        type: "LOAD_SETTINGS_AFTER_LOGIN",
        value: userSettings,
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "homedrawernavigator" }],
        }),
      );
    } else {
      await game({
        type: "CONTINUE_MATCH",
        value: userMatches[0],
      });
      navigation.navigate("ingame", {
        gameData: userMatches[0],
        username: userData.username,
      });
    }
  } catch (err) {
    console.log(err);
    return throwError(err.code, "signUp", navigation);
  }
};

export default loadAppData;