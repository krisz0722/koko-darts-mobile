import styled from "styled-components";
import { TouchableOpacity, Text } from "react-native";
import {
  FlexCol,
  AlignText,
  Window,
  BasicText,
  Border,
  BorderHorizontal,
} from "../styles/css_mixins";

import React, { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";

export const Button_Home = styled(TouchableOpacity)`
  text-decoration: none;
  width: 80%;
  height: ${() => Window.height * 0.1};
  margin: auto;
`;

export const Text_Button_Home = styled(Text)`
  ${FlexCol};
  ${BasicText};
  height: 100%;
  width: 100%;
  font-size: 15;
  border-radius: 4px;
  color: ${({ theme, text }) =>
    text === "new game" ? theme.text2 : theme.text};
  background-color: ${({ theme, text }) =>
    text === "new game" ? theme.bgActive : "transparent"};
  ${Border(({ theme }) => theme.text)}
`;

const HomeButton = ({ text, ghost, action }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return (
    <Button_Home ghost={ghost} theme={selectedTheme} onPress={action}>
      <Text_Button_Home text={text} theme={selectedTheme}>
        {text}
      </Text_Button_Home>
    </Button_Home>
  );
};

export default HomeButton;
