import React, { useContext } from "react";
import styled from "styled-components";
import { View } from "react-native";
import { FlexColEnd, FlexColAround } from "../styles/css_mixins";
import { SettingsContext } from "../contexts/SettingsContext";
import {
  Text_Title,
  Text_Subtitle,
  Text_Subtitle2,
} from "../components/Headers";
import ShapeThrow from "../../assets/svg/shape";
import NavButton from "../components/NavButton";
import NavBar from "../components/NavBar";
import { NavigationContext } from "../contexts/NavigationContext";

export const View_Headers = styled(View)`
  width: 100%;
  height: 30%;
  position: absolute;
  top: 20%;
  ${FlexColAround};
  border: 2px white solid;
`;

export const View_Shape = styled(View)`
  ${FlexColEnd};
  position: absolute;
  width: 100%;
  bottom: 10%;
  height: 40%;
`;

const WELCOME = ({ navigation }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const { setScreen, setShowTab } = useContext(NavigationContext);

  const enterGame = () => {
    setScreen("settings");
    setShowTab(true);
    navigation.navigate("homenavigator");
  };

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
          length={2}
          action={() => navigation.navigate("register")}
          text={"let's do it now!"}
        />
        <NavButton
          length={2}
          action={enterGame}
          text={"no thanks, let me play!"}
        />
      </NavBar>
    </>
  );
};

export default WELCOME;
