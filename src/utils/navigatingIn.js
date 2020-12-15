import { CommonActions } from "@react-navigation/native";

const navigatingIn = (navigation, navigationType, gameData = null) => {
  switch (navigationType) {
    case "continue":
      navigation.navigate("drawernavigator", {
        screen: "loadingscreen",
        params: { text: "loading match..." },
      });
      break;
    case "leave":
      navigation.navigate("homedrawernavigator", {
        screen: "loadingscreen",
        params: {
          text: "saving match...",
        },
      });
      break;
    case "new":
      navigation.navigate("drawernavigator", {
        screen: "loadingscreen",
        params: { text: "creating new match..." },
      });
      break;
    case "rematch":
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "drawernavigator", params: { flag: "new" } }],
        }),
      );
      navigation.navigate("drawernavigator", {
        screen: "loadingscreen",
        params: { text: "updating profile and creating new match..." },
      });
      break;
    case "updateProfile":
      navigation.navigate("homedrawernavigator", {
        screen: "loadingscreen",
        params: { text: "updating profile..." },
      });
      break;
    default:
      break;
  }
};
export default navigatingIn;
