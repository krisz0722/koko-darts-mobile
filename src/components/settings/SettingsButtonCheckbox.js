import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import styled from "styled-components";
import { Text, TouchableHighlight, View } from "react-native";
import { AlignText, FlexCol, FlexRowAround } from "../../styles/css_mixins";
import { Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const Button_Settings = styled(TouchableHighlight)`
  ${FlexCol};
  background-color: ${({ theme, active }) =>
    active ? theme.bgActive : "transparent"};
  flex-basis: ${({ length }) => 100 / length + "%"};
  height: 100%;
`;

const Div2 = styled(View)`
  ${FlexRowAround};
  width: 100%;
  height: 100%;
  padding: 0 5%;
`;

const Text_Button = styled(Text)`
  ${AlignText};
  ${FlexCol};
  height: 100%;
  width: 100%;
  padding: 0 10%;
  color: ${({ theme, active }) => (active ? theme.text2 : theme.text)};
  font-family: ${({ theme, active }) =>
    active ? theme.fontFamilyBold : theme.fontFamily};
  font-size: 12.5;
  text-transform: ${({ theme }) => theme.textTransform};
`;

const SETTINGS_BUTTON_CHECKBOX = ({ length, value, action, active }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const theme = selectedTheme;

  return (
    <Button_Settings
      active={active}
      length={length}
      onPress={action}
      theme={theme}
    >
      <Div2>
        <Checkbox
          uncheckedColor={theme.borderColor}
          color={active ? theme.bg1 : "transparent"}
          status={active ? "checked" : "unchecked"}
        />
        <Text_Button active={active} theme={theme}>
          {value}
        </Text_Button>
      </Div2>
    </Button_Settings>
  );
};

export default SETTINGS_BUTTON_CHECKBOX;
