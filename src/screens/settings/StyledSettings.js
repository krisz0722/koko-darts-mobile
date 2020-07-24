import styled from "styled-components";
import {
  FlexColBetween,
  FlexColStart,
  FlexRowAround,
  Window,
} from "../../styles/css_mixins";
import { View } from "react-native";

export const Options = styled(View)`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;
  height: 77%;
  ${FlexColStart};
`;

export const Bottom = styled(View)`
  ${FlexColBetween};
  position: absolute;
  bottom: 8%;
  height: 50%;
  width: 100%;
  height: ${() => Window.height * 0.5}
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
  height: ${() => Window.height * 0.15}
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const Row = styled(View)`
  height: ${({ header }) => (header ? "15%" : 100 / 5.5 + "%")};
  width: 100%;
  ${FlexColStart};
  position: absolute;
  z-index: ${({ preview }) => (preview ? -4 : 1)};
  opacity: ${({ preview }) => (preview ? 0 : 1)};
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const Row2 = styled(Row)`
  height: ${() => 100 / 5.5 / 2 + "%"};
  width: 100%;
`;

export const Div = styled(View)`
  ${FlexRowAround};
  width: 100%;
  height: 50%;
`;
