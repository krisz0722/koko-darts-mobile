import styled from "styled-components";
import { Text, TouchableHighlight } from "react-native";
import {
  Window,
  BasicTextBold,
  FlexCol,
  FlexRowAround,
} from "../../styles/css_mixins";

import React, { useContext } from "react";
import IconThreeDart from "../../../assets/iconThreeDart";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ThemeContext } from "../../contexts/ThemeContext";
import IconDart from "../../../assets/iconDart";

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
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)}
  padding: ${({ theme }) => (theme.name === "default" ? "0 2%" : "0 5%")};
  ${FlexRowAround};
`;

export const Text_Button_Login = styled(Text)`
  ${FlexCol};
  ${BasicTextBold};
  height: 100%;
  width: ${({ icon }) => (icon ? "70%" : "100%")};
  font-size: ${({ theme, size }) => theme.buttonFontSize[size]};
  color: ${({ theme, type }) => theme.buttonType[type].color};
`;

const THEMED_BUTTON = ({
  text,
  action,
  length = 1,
  size = "medium",
  type = "basic",
  icon = null,
  disabled = false,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Button_Login
      size={size}
      length={length}
      type={type}
      theme={theme}
      onPress={action}
      disabled={disabled}
    >
      <>
        {icon ? (
          icon === "dart" ? (
            <IconDart fill={theme.text} size={15} />
          ) : icon === "threedart" ? (
            <IconThreeDart fill={theme.text} size={15} />
          ) : (
            <Icon name={icon} size={25} color={theme.text} />
          )
        ) : null}
        <Text_Button_Login size={size} icon={icon} type={type} heme={theme}>
          {text}
        </Text_Button_Login>
      </>
    </Button_Login>
  );
};

export default THEMED_BUTTON;
