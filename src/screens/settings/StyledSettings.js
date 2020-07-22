import styled from "styled-components";
import {
  FlexCol,
  FlexColBetween,
  FlexColStart,
  FlexRowAround,
  FlexRowBetween,
  FlexRowStart,
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
  border: 4px green solid;
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
  border: 2px blue solid;
  z-index: ${({ visible }) => (visible ? 1 : -1)};
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
  border: 2px orange solid;
  background-color:orange;
`;

export const Row = styled(View)`
  height: ${({ header }) => (header ? "15%" : 100 / 5.5 + "%")};
  width: 100%;
  ${FlexColStart};
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const Row2 = styled(Row)`
  height: 7%;
  width: 100%;
  ${FlexRowStart};
`;

export const Div = styled(View)`
  ${FlexRowAround};
  width: 100%;
  height: 50%;
`;
