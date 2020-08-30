import auth from "@react-native-firebase/auth";
import { CommonActions } from "@react-navigation/native";

const loadAppData = async (userData, navigation, reducers) => {
  navigation.navigate("loadingscreen", { text: "loading profile..." });

  const { user, settings, game, theme } = reducers;
  const lastMatch = userData.matches[0];

  const lastOpponent = lastMatch ? lastMatch.opponent : null;

  const authUser = auth().currentUser;

  const img = authUser._user.photoURL;

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

  console.log("creating profile...");
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
  } else {
    await game({
      type: "CONTINUE_MATCH",
      value: userMatches[0],
    });
  }
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{ name: "homedrawernavigator" }],
    }),
  );
};

export default loadAppData;
