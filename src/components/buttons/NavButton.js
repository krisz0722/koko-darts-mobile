import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components";
import { BasicText, Flex, Window } from "../../styles/css_mixins";
import IconThreeDart from "../../../assets/iconThreeDart";
import { ThemeContext } from "../../contexts/ThemeContext";

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

const Text_Button = styled(Text)`
  ${BasicText};
  display: ${({ text }) => (text === "" ? "none" : "flex")};
  font-weight: ${({ direction }) => (direction === "row" ? "bold" : "normal")};
  width: 100%;
  color: ${({ color }) => color}
  font-size: ${({ direction, theme }) =>
    direction === "row" || direction === "row-reverse"
      ? theme.nav.fontSize2
      : theme.nav.fontSize1};
  border-radius: 4px;
`;

const NavButton = React.memo(
  ({
    text,
    length,
    active,
    direction,
    height = null,
    color = "light",
    action = null,
    icon = null,
    inap = null,
  }) => {
    const { theme, animation } = useContext(ThemeContext);

    const iconColor = () => {
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
        }
      }
    };

    const textColor = () => {
      if (active) {
        return theme.text2;
      } else {
        switch (color) {
          case "dark":
            return theme.text2;
          case "light":
            return theme.text;
          case "drawer":
            return theme.game[inap + "Text"];
        }
      }
    };

    return (
      <Button_Nav
        direction={direction}
        active={active}
        length={length}
        height={height}
        theme={theme}
        onPress={action}
        text={text}
        activeOpacity={animation ? 0.2 : 1}
      >
        <>
          {icon === "dart" ? (
            <IconThreeDart size={25} fill={iconColor()} />
          ) : icon ? (
            <Icon name={icon} size={25} color={iconColor()} />
          ) : null}
          {text ? (
            <Text_Button
              color={textColor()}
              active={active}
              icon={icon}
              theme={theme}
              text={text}
            >
              {text}
            </Text_Button>
          ) : null}
        </>
      </Button_Nav>
    );
  },
);

export default NavButton;
