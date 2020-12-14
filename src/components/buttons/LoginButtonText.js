import React from "react";
import styled from "styled-components/native";
import { FlexCol } from "../../styles/css_mixins";
import { Header2, Header3, Header4 } from "../headers/StyledHeaders";

export const Text_Button_Login_Small = styled(Header4)`
  ${FlexCol};
  text-align: ${({ align }) => align};
  margin-left: ${({ align }) => (align === "center" ? "5%" : 0)};
  height: 100%;
  color: ${({ theme, type }) => theme.buttonType[type].color};
`;

export const Text_Button_Login_Medium = styled(Header3)`
  ${FlexCol};
  text-align: ${({ align }) => align};
  margin-left: ${({ align }) => (align === "center" ? "5%" : 0)};
  height: 100%;
  color: ${({ theme, type }) => theme.buttonType[type].color};
`;

export const Text_Button_Login_Large = styled(Header2)`
  ${FlexCol};
  text-align: ${({ align }) => align};
  margin-left: ${({ align }) => (align === "center" ? "5%" : 0)};
  height: 100%;
  color: ${({ theme, type }) => theme.buttonType[type].color};
`;

const LOGIN_BUTTON_TEXT = React.memo(
  ({
    text,
    size = "medium",
    type = "basic",
    icon = null,
    social,
    theme,
    align = "left",
  }) => {
    switch (size) {
      case "small":
        return (
          <Text_Button_Login_Small
            text={text}
            size={size}
            icon={icon}
            type={type}
            theme={theme}
            social={social}
            align={align}
          >
            {text}
          </Text_Button_Login_Small>
        );
      case "medium":
        return (
          <Text_Button_Login_Medium
            text={text}
            size={size}
            icon={icon}
            type={type}
            theme={theme}
            social={social}
            align={align}
          >
            {text}
          </Text_Button_Login_Medium>
        );
      case "large":
        return (
          <Text_Button_Login_Large
            text={text}
            size={size}
            icon={icon}
            type={type}
            theme={theme}
            social={social}
            align={align}
          >
            {text}
          </Text_Button_Login_Large>
        );
      default:
        return (
          <Text_Button_Login_Medium
            text={text}
            size={size}
            icon={icon}
            type={type}
            theme={theme}
            social={social}
            align={align}
          >
            {text}
          </Text_Button_Login_Medium>
        );
    }
  },
);

export default LOGIN_BUTTON_TEXT;
