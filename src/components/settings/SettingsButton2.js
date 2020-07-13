import styled from "styled-components";
import { Text, TouchableHighlight } from "react-native";
import { FlexCol, AlignText } from "../../styles/css_mixins";

import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";

export const Button_Login = styled(TouchableHighlight)`
  text-decoration: none;
  width: 40%;
  height: 50%;
  margin: auto;
  border-radius: 4px;
`;

export const Text_Button_Login = styled(Text)`
  ${FlexCol};
  ${AlignText};
  height: 100%;
  width: 100%;
  padding: 0 5%;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 15;
  text-transform: ${({ theme }) => theme.textTransform};
  border-radius: 4px;
  color: ${({ theme }) => theme.text};
  border-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.text};
`;

const SETTINGS_BUTTON_2 = ({ value, action, disabled }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const theme = selectedTheme;

  return (
    <Button_Login
      activeOpacity={0.6}
      underlayColor={value === "preview" ? theme.bgGreen : theme.bgRed}
      disabled={disabled}
      theme={theme}
      onPress={() => console.log("valami")}
    >
      <Text_Button_Login theme={theme}>{value}</Text_Button_Login>
    </Button_Login>
  );
};

export default SETTINGS_BUTTON_2;
