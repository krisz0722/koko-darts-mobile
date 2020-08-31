import styled from "styled-components";
import { View, TouchableHighlight } from "react-native";
import { Window, FlexRow } from "../../styles/css_mixins";

import React, { useContext } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ThemeContext } from "../../contexts/ThemeContext";
import FacebookIcon from "../../../assets/facebookIcon";
import GoogleIcon from "../../../assets/googleIcon";
import LOGIN_BUTTON_TEXT from "./LoginButtonText";

export const LoginButton = styled(TouchableHighlight)`
  text-decoration: none;
  width: ${({ length }) => 80 / length + "%"};
  height: ${({ size, theme }) => Window.height * theme.buttonSize[size]};
  border-radius: 4px;
  background-color: ${({ theme, fill, type }) =>
    fill ? fill : theme.buttonType[type].bg};
  border-width: ${({ theme, type }) =>
    type !== "ghost" ? theme.borderWidth : 0};
  border-color: ${({ theme, fill }) => (fill ? fill : theme.text)};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  ${FlexRow};
  justify-content: ${({ align }) =>
    align === "center" ? "center" : "flex-start"};
`;

export const IconCon = styled(View)`
  width: ${({ align, theme }) =>
    align === "center" ? "auto" : theme.name === "contrast" ? "35%" : "30%"};
  ${FlexRow};
`;

export const loginIcons = (social, theme, type) => {
  switch (social) {
    case "google":
      return <GoogleIcon />;
    case "facebook":
      return <FacebookIcon />;
    default:
      return (
        <Icon
          name={social}
          size={theme.fonts.icon1}
          color={type === "active" ? theme.buttonType[type].color : theme.text}
        />
      );
  }
};

const AUTH_BUTTON = React.memo(
  ({
    text,
    action,
    length = 1,
    size = "medium",
    type = "basic",
    icon = null,
    disabled = false,
    inGameTheme = null,
    social,
    fill,
    align = "left",
  }) => {
    const { theme } = useContext(ThemeContext);
    const themeToUse = inGameTheme ? inGameTheme : theme;

    return (
      <LoginButton
        size={size}
        length={length}
        type={type}
        theme={themeToUse}
        fill={fill}
        onPress={action}
        disabled={disabled}
        align={align}
      >
        <>
          {social ? (
            <IconCon align={align}>{loginIcons(social, theme, type)}</IconCon>
          ) : null}
          {text ? (
            <LOGIN_BUTTON_TEXT
              text={text}
              size={size}
              icon={icon}
              type={type}
              theme={themeToUse}
              social={social}
              align={align}
            />
          ) : null}
        </>
      </LoginButton>
    );
  },
);

export default AUTH_BUTTON;
