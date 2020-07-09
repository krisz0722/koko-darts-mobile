import React, { useContext, useState } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import {
  View_Shape,
  View_Headers,
  Text_Title,
  Text_Subtitle,
  Text_Subtitle2,
} from "../components/containers/Styled_Welcome";
import ShapeThrow from "../../assets/svg/shape";
import NavButton from "../components/NavButton";
import NavBar from "../components/NavBar";

export const WELCOME = ({ navigation }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return (
    <>
      <View_Headers>
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
      <View_Shape>
        <ShapeThrow fill={selectedTheme.bgActive} />
      </View_Shape>

      <NavBar theme={selectedTheme}>
        <NavButton
          action={() => navigation.navigate("register")}
          text={"let's do it now!"}
        />
        <NavButton
          action={() => navigation.navigate("settings")}
          text={"no thanks, let me play!"}
        />
      </NavBar>
    </>
  );
};
