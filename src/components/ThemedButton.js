import styled from "styled-components";
import { TouchableOpacity, Text, TouchableHighlight } from "react-native";
import {
  Window,
  BasicText,
  FlexCol,
  AlignText,
  FlexRow,
  FlexRowAround,
} from "../styles/css_mixins";

import React, { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import IconThreeDart from "../../assets/iconThreeDart";
import Icon from "react-native-vector-icons/MaterialIcons";

export const Button_Login = styled(TouchableHighlight)`
  text-decoration: none;
  width: ${({ length }) => 80 / length + "%"};
  height: ${({ size, theme }) => Window.height * theme.buttonSize[size]};
  margin: auto;
  border-radius: 4px;
  background-color: ${({ theme, type }) => theme.buttonType[type].bg};
  border-width: ${({ theme, type }) =>
    type !== "ghost" ? theme.borderWidth : 0};
  border-color: ${({ theme }) => theme.text};
  padding: 0 5%;
  ${FlexRowAround};
`;

export const Text_Button_Login = styled(Text)`
  ${FlexCol};
  ${BasicText};
  height: 100%;
  width: 70%;
  font-size: ${({ theme, type }) => theme.buttonFontSize};
  color: ${({ theme, type }) => theme.buttonType[type].color};
`;

const THEMED_BUTTON = ({
  text,
  action,
  length = 1,
  size = "medium",
  type = "basic",
  icon = null,
}) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  console.log(typeof size);
  return (
    <Button_Login
      size={size}
      length={length}
      type={type}
      theme={selectedTheme}
      onPress={action}
    >
      <>
        {icon ? (
          icon === "dart" ? (
            <>
              <IconThreeDart fill={selectedTheme.text} size={15} />
            </>
          ) : (
            <Icon name={icon} size={25} color={selectedTheme.text} />
          )
        ) : null}
        <Text_Button_Login type={type} heme={selectedTheme}>
          {text}
        </Text_Button_Login>
      </>
    </Button_Login>
  );
};

export default THEMED_BUTTON;
