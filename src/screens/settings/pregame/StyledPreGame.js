import styled from "styled-components/native";
import {
  FlexCol,
  FlexColStart,
  FlexRowAround,
  Window,
} from "../../../styles/css_mixins";
import { TouchableHighlight, View } from "react-native";

export const SettingsPreGameBottomButtons = styled(View)`
  ${FlexRowAround};
  position:absolute;
  bottom: 0;
  width: 100%;
  height: ${() => Window.height * 0.15}
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const Row = styled(View)`
  height: ${() => 100 / 5.5 + "%"};
  width: 100%;
  ${FlexColStart};
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

export const Swap = styled(TouchableHighlight)`
  width: 10%;
  height: ${() => Window.width * 0.1};
  background-color: ${({ theme }) => theme.bgActive};
  border-radius: 4px;
  ${FlexCol};
`;

export const SettingsPreGamePlayers = styled(View)`
  width: 100%;
  ${FlexRowAround};
  height: 25%;
`;
