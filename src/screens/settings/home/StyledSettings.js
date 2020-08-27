import styled from "styled-components";
import {
  FlexColBetween,
  FlexColStart,
  FlexRowAround,
  Window,
} from "../../../styles/css_mixins";
import { View } from "react-native";

export const Options = styled(View)`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;
  height: ${() => Window.height * 0.7};
  ${FlexColStart};
`;

export const Bottom = styled(View)`
  ${FlexColBetween};
  position: absolute;
  bottom: 8%;
  width: 100%;
  height: 50%;
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
  z-index: ${({ preview }) => (preview ? 3 : -1)};
`;

export const BottomButtons = styled(View)`
  ${FlexRowAround};
  position: absolute;
  bottom: 0;
  height: 30%;
  width: 100%;
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const Row = styled(View)`
  height: 14%;
  width: 100%;
  ${FlexColStart};
  opacity: ${({ preview }) => (preview ? 0 : 1)};
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const Row2 = styled(Row)`
  height: 7%;
  width: 100%;
`;

export const Div = styled(View)`
  ${FlexRowAround};
  width: 100%;
  height: 50%;
`;

export const Div2 = styled(Div)`
  height: 100%;
`;
