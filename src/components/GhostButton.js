import styled from "styled-components";
import { TouchableOpacity, Text } from "react-native";
import { Window, FlexCol, AlignText } from "../styles/css_mixins";

import React, { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";

export const Button_Login = styled(TouchableOpacity)`
  text-decoration: none;
  width: ${() => Window.width * 1};
  height: 15%;
  position: absolute;
  bottom: 0;
`;

export const Text_Button_Login = styled(Text)`
  ${FlexCol};
  ${AlignText};
  height: 100%;
  width: 100%;
  padding: 0 5%;
  font-family: ${({ theme }) => theme.fontFamilyBold};
  font-size: 15;
  text-transform: ${({ theme }) => theme.textTransform};
  color: ${({ theme }) => theme.borderColor};
`;

const GhostButton = ({ text, action, disabled }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return (
    <Button_Login disabled={disabled} theme={selectedTheme} onPress={action}>
      <Text_Button_Login theme={selectedTheme}>{text}</Text_Button_Login>
    </Button_Login>
  );
};

export default GhostButton;
