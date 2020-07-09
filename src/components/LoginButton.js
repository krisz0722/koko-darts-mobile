import styled from "styled-components";
import { TouchableOpacity, Text } from "react-native";
import { FlexCol, AlignText } from "../styles/css_mixins";

import React, { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";

export const Button_Login = styled(TouchableOpacity)`
  text-decoration: none;
  width: 100%;
  height: 15%;
  border-radius: 4px;
  background-color: ${({ disabled, theme }) =>
    !disabled ? theme.bgActive : "transparent"};
`;

export const Text_Button_Login = styled(Text)`
  ${FlexCol};
  ${AlignText};
  height: 100%;
  width: 100%;
  padding: 0 5%;
  font-family: ${({ disabled, theme }) =>
    !disabled ? theme.fontFamilyBold : theme.fontFamily};
  font-size: 15;
  text-transform: ${({ theme }) => theme.textTransform};
  border-radius: 4px;
  color: ${({ disabled, theme }) =>
    !disabled ? theme.text2 : theme.borderColor};
  border-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

const LoginButton = ({ text, action, disabled }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return (
    <Button_Login disabled={disabled} theme={selectedTheme} onPress={action}>
      <Text_Button_Login disabled={disabled} theme={selectedTheme}>
        {text}
      </Text_Button_Login>
    </Button_Login>
  );
};

export default LoginButton;
