import React, { useContext } from "react";
import styled from "styled-components/native";
import { View, TouchableHighlight } from "react-native";
import { FlexCol, FlexRow } from "../../styles/css_mixins";
import Icon from "react-native-vector-icons/MaterialIcons";
import CheckBox from "@react-native-community/checkbox";
import { ThemeContext } from "../../contexts/ThemeContext";
import { P1, P2 } from "../headers/StyledHeaders";

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

const Text_Button1 = styled(P1)`
  color: ${({ theme, active }) => (active ? theme.text2 : theme.text)};
  font-family: ${({ theme, active }) =>
    active ? theme.fontFamilyBold : theme.fontFamily};
`;

const Text_Button2 = styled(P2)`
  color: ${({ theme, active }) => (active ? theme.text2 : theme.text)};
  font-family: ${({ theme, active }) =>
    active ? theme.fontFamilyBold : theme.fontFamily};
`;

const OPTION_BUTTON = React.memo(
  ({
    length,
    value = "",
    action = null,
    active = false,
    icon = null,
    size = null,
    checkbox = false,
    inGameTheme = null,
  }) => {
    const { theme } = useContext(ThemeContext);

    const themeToUse = inGameTheme ? inGameTheme : theme;

    return (
      <Button_Settings
        icon={icon}
        active={active}
        length={length}
        onPress={action}
        theme={themeToUse}
        checkbox={checkbox}
      >
        <TextAndIcon>
          {size === "small" ? (
            <Text_Button2 size={size} active={active} theme={themeToUse}>
              {value}
            </Text_Button2>
          ) : (
            <Text_Button1 size={size} active={active} theme={themeToUse}>
              {value}
            </Text_Button1>
          )}

          {icon ? (
            <Icon
              name={icon}
              size={theme.fonts.iconBig}
              color={themeToUse.text2}
            />
          ) : null}
          {checkbox ? (
            <CheckBox
              tintColors={{ true: themeToUse.bg3, false: themeToUse.text }}
              onCheckColor={themeToUse.bg1}
              value={active}
              onChange={action}
            />
          ) : null}
        </TextAndIcon>
      </Button_Settings>
    );
  },
);

export default OPTION_BUTTON;
