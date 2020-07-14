import styled from "styled-components";
import { TouchableOpacity, Text } from "react-native";
import { FlexCol, AlignText } from "../styles/css_mixins";

import React, { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";

export const Button_Home = styled(TouchableOpacity)`
  text-decoration: none;
  width: 80%;
  height: 30%;
  margin: auto;
  border-radius: 4px;
  background-color: transparent;
`;

export const Text_Button_Home = styled(Text)`
  ${FlexCol};
  ${AlignText};
  height: 100%;
  width: 100%;
  padding: 0 5%;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 15;
  text-transform: ${({ theme }) => theme.textTransform};
  border-radius: 4px;
  color: ${({ theme, text }) =>
    text === "new game" ? theme.text2 : theme.text};
  background-color: ${({ theme, text }) =>
    text === "new game" ? theme.bgActive : theme.bgRed};
`;

const HomeButton = ({ text, action }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return (
    <Button_Home theme={selectedTheme} onPress={action}>
      <Text_Button_Home text={text} theme={selectedTheme}>
        {text}
      </Text_Button_Home>
    </Button_Home>
  );
};

export default HomeButton;
