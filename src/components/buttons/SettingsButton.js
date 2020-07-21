import React, { useContext } from "react";
import styled from "styled-components";
import { Text, View, TouchableHighlight } from "react-native";
import { BasicText, FlexCol, FlexRow } from "../../styles/css_mixins";
import Icon from "react-native-vector-icons/MaterialIcons";
import CheckBox from "@react-native-community/checkbox";
import { ThemeContext } from "../../contexts/ThemeContext";

const Button_Settings = styled(TouchableHighlight)`
  ${FlexCol};
  background-color: ${({ theme, active }) =>
    active ? theme.bgActive : "transparent"};
  flex-basis: ${({ length }) => 100 / length + "%"};
  height: 100%;
  padding: ${({ icon }) => (icon ? "0 5%" : 0)};
`;
const TextAndIcon = styled(View)`
  ${FlexRow};
  width: 100%;
  height: 100%;
  padding: 0 5%;
`;

const Text_Button = styled(Text)`
  ${BasicText};
  height: 100%;
  padding: 0 0%;
  color: ${({ theme, active }) => (active ? theme.text2 : theme.text)};
  font-family: ${({ theme, active }) =>
    active ? theme.fontFamilyBold : theme.fontFamily};
  font-size: ${({ size, theme }) =>
    size === "small"
      ? theme.settings.fontSizeButton2
      : theme.settings.fontSizeButton};
`;

const SETTINGS_BUTTON = ({
  length,
  value = "",
  action = null,
  active = false,
  icon = null,
  size = null,
  checkbox = false,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Button_Settings
      icon={icon}
      active={active}
      length={length}
      onPress={action}
      theme={theme}
      checkbox={checkbox}
    >
      <TextAndIcon>
        <Text_Button size={size} active={active} theme={theme}>
          {value}
        </Text_Button>
        {icon ? <Icon name={icon} size={35} color={theme.text2} /> : null}
        {checkbox ? (
          <CheckBox
            tintColors={{ true: theme.bg3, false: theme.text }}
            onCheckColor={theme.bg1}
            value={active}
            onChange={action}
          />
        ) : null}
      </TextAndIcon>
    </Button_Settings>
  );
};

export default SETTINGS_BUTTON;
