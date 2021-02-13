import React from "react";
import styled from "styled-components";
import { P2, P1 } from "../headers/StyledHeaders";

const textColor = (active, color, theme, inap) => {
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
      default:
        return theme.text;
    }
  }
};

const Text_Button_Row = styled(P2)`
  text-align: ${({ type }) => (type === "drawer" ? "left" : "center")};
  font-family: ${({ theme, type }) =>
    type === "drawer" ? theme.fontFamilyBold : theme.fontFamily};
  width: ${({ type }) => (type === "drawer" ? "70%" : "100%")};
  color: ${({ color }) => color}
  border-radius: 4px;
  margin-left: ${({ type }) => (type === "drawer" ? "5%" : "0%")}
`;

const Text_Button_Col = styled(P1)`
  text-align: ${({ type }) => (type === "drawer" ? "left" : "center")};
  width: ${({ type }) => (type === "drawer" ? "70%" : "100%")};
  color: ${({ color }) => color}
  border-radius: 4px;
  margin-left: ${({ type }) => (type === "drawer" ? "5%" : "0%")}
  
`;

const NAV_BUTTON_TEXT = ({
  direction,
  type,
  color,
  active,
  icon,
  theme,
  text,
  inap,
}) => {
  const colorStyle = textColor(active, color, theme, inap);

  switch (direction) {
    case "row":
      return (
        <Text_Button_Row
          type={type}
          color={colorStyle}
          active={active}
          icon={icon}
          theme={theme}
          text={text}
          direction={direction}
        >
          {text}
        </Text_Button_Row>
      );
    case "row-reverse":
      return (
        <Text_Button_Row
          type={type}
          color={colorStyle}
          active={active}
          icon={icon}
          theme={theme}
          text={text}
          direction={direction}
        >
          {text}
        </Text_Button_Row>
      );
    default:
      return (
        <Text_Button_Col
          type={type}
          color={colorStyle}
          active={active}
          icon={icon}
          theme={theme}
          text={text}
          direction={direction}
        >
          {text}
        </Text_Button_Col>
      );
  }
};

export default NAV_BUTTON_TEXT;
