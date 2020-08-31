import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components";
import { Flex, Window } from "../../styles/css_mixins";
import IconThreeDart from "../../../assets/iconThreeDart";
import { ThemeContext } from "../../contexts/ThemeContext";
import NAV_BUTTON_TEXT from "./NavButtonText";

const iconColor = (active, color, theme, inap) => {
  if (active) {
    return theme.text2;
  } else {
    switch (color) {
      case "dark":
        return theme.bg3;
      case "light":
        return theme.text;
      case "drawer":
        return theme.game[inap + "Text"];
      default:
        return theme.text;
    }
  }
};

const Button_Nav = styled(TouchableOpacity)`
  ${Flex};
  flex-direction: ${({ direction }) => direction};
  width: ${({ length }) =>
    length === "auto" ? "auto" : Window.width / length};
  height: ${({ height }) =>
    height === "auto" ? "auto" : height ? Window.height / height : "100%"};
  padding: ${({ direction }) =>
    direction === "row" || direction === "row-reverse" ? "0 5%" : 0};
  background-color: ${({ theme, active }) =>
    active ? theme.bgActive : "transparent"};
`;

const NAV_BUTTON = React.memo(
  ({
    text,
    length,
    active = false,
    direction,
    height = null,
    color = "light",
    action = null,
    icon = null,
    inap = null,
    inGameTheme = null,
    type = null,
  }) => {
    const {
      theme,
      themeContext: { animation },
    } = useContext(ThemeContext);

    const themeToUse = inGameTheme ? inGameTheme : theme;

    return (
      <Button_Nav
        direction={direction}
        active={active}
        length={length}
        height={height}
        theme={themeToUse}
        onPress={action}
        text={text}
        activeOpacity={animation ? 0.2 : 1}
      >
        <>
          {icon === "dart" ? (
            <IconThreeDart
              size={25}
              fill={iconColor(active, color, themeToUse, inap)}
            />
          ) : icon ? (
            <Icon
              name={icon}
              size={25}
              color={iconColor(active, color, themeToUse, inap)}
            />
          ) : null}
          {text ? (
            <NAV_BUTTON_TEXT
              direction={direction}
              type={type}
              color={color}
              inap={inap}
              active={active}
              icon={icon}
              theme={themeToUse}
              text={text}
            >
              {text}
            </NAV_BUTTON_TEXT>
          ) : null}
        </>
      </Button_Nav>
    );
  },
);

export default NAV_BUTTON;
