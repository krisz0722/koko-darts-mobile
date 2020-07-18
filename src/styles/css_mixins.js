import { css } from "styled-components";
import { Dimensions } from "react-native";

export const Absolute = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Window = {
  height: Dimensions.get("window").height,
  width: Dimensions.get("window").width,
};

export const BasicText = () => css`
  text-align-vertical: center;
  text-align: center;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fontFamily};
`;

export const BasicTextBold = () => css`
  text-align-vertical: center;
  text-align: center;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fontFamilyBold};
`;

export const Border = (color) => css`
  border-color: ${({}) => color};
  border-width: ${({ theme }) => theme.borderWidth};
`;

export const BorderHorizontal = (color) => css`
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-bottom-width: ${({ theme }) => theme.borderWidth};
  border-color: ${() => color};
`;

export const AlignText = css`
  text-align-vertical: center;
  text-align: center;
`;

export const Flex = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FlexCol = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FlexColStart = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const FlexColAround = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const FlexColBetween = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const FlexColEnd = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

export const FlexRow = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const FlexRowAround = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const FlexRowBetween = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FlexRowStart = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
