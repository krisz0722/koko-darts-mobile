import styled from "styled-components";
import { TouchableHighlight } from "react-native";
import { Window, FlexRowAround } from "../../styles/css_mixins";
import React, { useContext } from "react";
import IconThreeDart from "../../../assets/iconThreeDart";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ThemeContext } from "../../contexts/ThemeContext";
import IconDart from "../../../assets/iconDart";
import BUTTON_TEXT from "./ThemedButtonText";

export const ThemedButton = styled(TouchableHighlight)`
  text-decoration: none;
  width: ${({ length }) => 80 / length + "%"};
  height: ${({ size, theme }) => Window.height * theme.buttonSize[size]};
  margin: auto;
  border-radius: 4px;
  background-color: ${({ theme, type }) => theme.buttonType[type].bg};
  border-width: ${({ theme, type }) =>
    type !== "ghost" ? theme.borderWidth : 0};
  border-color:${({ theme, type }) => theme.buttonType[type].bg};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)}
  padding: ${({ theme }) => (theme.name === "default" ? "0 2%" : "0 5%")};
  ${FlexRowAround};
`;

const THEMED_BUTTON = React.memo(
  ({
    text,
    action,
    length = 1,
    size = "medium",
    type = "basic",
    icon = null,
    disabled = false,
    inGameTheme = null,
  }) => {
    const { theme } = useContext(ThemeContext);
    const themeToUse = inGameTheme ? inGameTheme : theme;

    return (
      <ThemedButton
        size={size}
        length={length}
        type={type}
        theme={themeToUse}
        onPress={action}
        disabled={disabled}
      >
        <>
          {icon ? (
            icon === "dart" ? (
              <IconDart fill={themeToUse.text} size={theme.fonts.icon3} />
            ) : icon === "threedart" ? (
              <IconThreeDart fill={themeToUse.text} size={theme.fonts.icon3} />
            ) : (
              <Icon
                name={icon}
                size={theme.fonts.icon1}
                color={themeToUse.buttonType[type].color}
              />
            )
          ) : null}
          {text ? (
            <BUTTON_TEXT
              text={text}
              size={size}
              icon={icon}
              type={type}
              theme={theme}
            />
          ) : null}
        </>
      </ThemedButton>
    );
  },
);

export default THEMED_BUTTON;
