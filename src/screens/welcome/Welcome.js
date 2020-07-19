import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import ShapeThrow from "../../../assets/shapeThrow";
import {
  View_Headers,
  Text_Subtitle,
  Text_Subtitle2,
  Text_Title,
  View_Shape,
} from "./StyledWelcome";
import TABNAVIGATOR from "../../components/navigation/TabNavigator";

const WELCOME = ({ navigation }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const TABS = [
    {
      route: "register",
      text: "let's do it now!",
      icon: null,
      action: () => navigation.navigate("register"),
    },
    {
      route: "homenavigator",
      text: "no thanks, let me play!",
      icon: null,
      action: () => navigation.navigate("homenavigator"),
    },
  ];

  return (
    <>
      <View_Headers theme={selectedTheme}>
        <Text_Title theme={selectedTheme}>
          Welcome to koko's darts scoreboard!
        </Text_Title>
        <Text_Subtitle theme={selectedTheme}>
          Sign up and create a profile in order to save and sync your games
          between your computer and mobile device.
        </Text_Subtitle>
        <Text_Subtitle2 theme={selectedTheme}>
          If you skip this step now, you can sign up later in the profile menu.
        </Text_Subtitle2>
      </View_Headers>
      <View_Shape theme={selectedTheme}>
        <ShapeThrow fill={selectedTheme.bgActive} />
      </View_Shape>
      <TABNAVIGATOR
        tabs={TABS}
        position={"bottom"}
        length={2}
        direction={"vertical"}
      />
    </>
  );
};

export default WELCOME;
