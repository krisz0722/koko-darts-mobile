import { CommonActions } from "@react-navigation/native";

const navigatingOut = (navigation, navigationType, gameData) => {
  switch (navigationType) {
    case "continue":
      navigation.navigate("drawernavigator", {
        screen: "game",
        flag: "continue",
        gameData,
      });
      break;
    case "leave":
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "homedrawernavigator" }],
        }),
      );
      break;
    case "new":
      navigation.navigate("drawernavigator", {
        screen: "game",
        flag: "new",
      });
      break;
    case "rematch":
      console.log("ITT REMATCH OUT");
      navigation.navigate("drawernavigator", {
        screen: "game",
        flag: "new",
      });
      break;
    case "updateProfile":
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "homedrawernavigator" }],
        }),
      );
      break;
  }
};
export default navigatingOut;
