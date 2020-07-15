import styled from "styled-components";
import { Text, TouchableHighlight } from "react-native";
import { FlexCol, AlignText, FlexRow } from "../../styles/css_mixins";
import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import Icon from "react-native-vector-icons/MaterialIcons";
import SvgIcon from "@material-ui/core/SvgIcon";

import ICON_DART from "../../../assets/dart";

export const Button_Login = styled(TouchableHighlight)`
  text-decoration: none;
  width: 40%;
  height: 50%;
  margin: auto;
  border-radius: 4px;
  ${FlexRow};
  border-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.text};
`;

export const Text_Button_Login = styled(Text)`
  ${FlexCol};
  ${AlignText};
  height: 100%;
  padding: 0 5%;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 12;
  text-transform: ${({ theme }) => theme.textTransform};
  border-radius: 4px;
  color: ${({ theme }) => theme.text};
`;

const SETTINGS_BUTTON_2 = ({ value, action, disabled, icon = null }) => {
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
      <>
        {icon ? <Icon name={icon} size={25} color={theme.text} /> : null}
        <Text_Button_Login theme={theme}>{value}</Text_Button_Login>
      </>
    </Button_Login>
  );
};

export default SETTINGS_BUTTON_2;
