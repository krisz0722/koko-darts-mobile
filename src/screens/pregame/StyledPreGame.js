import styled from "styled-components";
import { FlexColStart, FlexRowAround, Window } from "../../styles/css_mixins";
import { View } from "react-native";

export const Options = styled(View)`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;
  height: 85%;
  ${FlexColStart};
`;

export const BottomButtons = styled(View)`
  ${FlexRowAround};
  position:absolute;
  bottom: 0;
  height: 15%;
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
