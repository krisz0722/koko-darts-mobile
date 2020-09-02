import styled from "styled-components";
import { View, SafeAreaView } from "react-native";
import {
  FlexCol,
  FlexColAround,
  FlexRow,
  Window,
} from "../../styles/css_mixins";
import { Header2, P1_Bold } from "../../components/headers/StyledHeaders";

export const Safe = styled(SafeAreaView)`
  height: 100%;
  width: 100%;
  ${FlexCol};
  background-color: ${({ theme, filled }) =>
    filled ? theme.bgOverlay2 : "transparent"};
`;

export const Con = styled(View)`
  height: ${() => Window.height};
  margin-top: ${({ isKeyboardUp }) => (isKeyboardUp ? "-50%" : 0)};
  width: 100%;
  ${FlexColAround};
`;

export const Con2 = styled(View)`
  ${FlexColAround};
  height: 80%;
  width: 100%;
`;

export const Title = styled(Header2)`
  width: 100%;
  height: 10%;
  background-color: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.text2};
`;

export const Title2 = styled(Title)`
  background-color: rgba(255, 255, 255, 0.1);
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

export const Message = styled(P1_Bold)`
  color: ${({ theme, filled }) => (filled ? theme.text : theme.text)};
  height: 30%;
  width: 90%;
`;

export const Title3 = styled(P1_Bold)`
  color: ${({ theme }) => theme.text};
  width: 80%;
  height: 10%;
`;

export const ErrorMessage = styled(Title3)`
  color: ${({ theme }) => theme.bgRed};
`;
