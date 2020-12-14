import styled from "styled-components/native";
import React from "react";
import { Header3, Header2, Header4 } from "../headers/StyledHeaders";

export const Text_Large = styled(Header2)`
  width: ${({ icon, text }) => (text === "" ? "0%" : icon ? "70%" : "100%")};
  color: ${({ theme, type }) => theme.buttonType[type].color};
`;

export const Text_Medium = styled(Header3)`
  width: ${({ icon, text }) => (text === "" ? "0%" : icon ? "70%" : "100%")};
  color: ${({ theme, type }) => theme.buttonType[type].color};
`;

export const Text_Small = styled(Header4)`
  width: ${({ icon, text }) => (text === "" ? "0%" : icon ? "70%" : "100%")};
  color: ${({ theme, type }) => theme.buttonType[type].color};
`;

const BUTTON_TEXT = ({ text, size, icon, type, theme }) => {
  switch (size) {
    case "small":
      return (
        <Text_Small
          text={text}
          size={size}
          icon={icon}
          type={type}
          theme={theme}
        >
          {text}
        </Text_Small>
      );
    case "medium":
      return (
        <Text_Medium
          text={text}
          size={size}
          icon={icon}
          type={type}
          theme={theme}
        >
          {text}
        </Text_Medium>
      );
    case "large":
      return (
        <Text_Large
          text={text}
          size={size}
          icon={icon}
          type={type}
          theme={theme}
        >
          {text}
        </Text_Large>
      );
  }
};

export default BUTTON_TEXT;
