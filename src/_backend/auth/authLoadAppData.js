import auth from "@react-native-firebase/auth";

const loadAppData = async (userData, navigation, reducers) => {
  const { user, settings, game, theme, animation, background } = reducers;
  const lastMatch = userData.matches[0];
  const friends = userData.friends;

  const lastOpponent = lastMatch ? lastMatch.opponent : null;

  const authUser = auth().currentUser;
  console.log("USERDATA SETTINGS", userData.settings);
  console.log("AUTHUSER", authUser._user);

  const img = authUser._user.photoURL;

  const getSettings = () => {
    const p1 = { ...userData.settings.p1, img };
    console.log("P!SETTINGS", p1);
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
  await theme(userSettings.theme);
  await animation(userSettings.animation);
  await background(userSettings.background);
  await settings({
    type: "LOAD_SETTINGS",
    value: userSettings,
  });
  if (userMatches.length === 0 || lastMatch.status === "finished") {
    console.log("GAME LOAD SETTINGS ", userSettings);
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
  navigation.navigate("homedrawernavigator");
};

export default loadAppData;
