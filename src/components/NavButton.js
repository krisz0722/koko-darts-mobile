import styled from "styled-components";
import { Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import { FlexCol } from "styles/css_mixins";
import { AlignText } from "../styles/css_mixins";

const Button_Nav = styled(TouchableOpacity)`
  ${FlexCol};
  width: 50%;
  height: 100%;
  text-align: center;
`;

const Text_Button = styled(Text)`
  ${FlexCol};
  ${AlignText};
  height: 100%;
  width: 100%;
  padding: 0 5%;
  color: ${({ theme }) => theme.text};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.menu.fontSize};
  text-transform: ${({ theme }) => theme.textTransform};
  border-radius: 4px;
`;

const NavButton = ({ text, action }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return (
    <Button_Nav theme={selectedTheme} onPress={action}>
      <Text_Button theme={selectedTheme}>{text}</Text_Button>
    </Button_Nav>
  );
};

export default NavButton;
