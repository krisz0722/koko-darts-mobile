import styled from "styled-components";
import { View, SafeAreaView } from "react-native";
import { FlexCol, FlexColAround } from "../../styles/css_mixins";
import { Header2, P1_Bold } from "../../components/headers/StyledHeaders";

export const Safe = styled(SafeAreaView)`
  height: 100%;
  width: 100%;
  ${FlexCol};
  background-color: ${({ theme, filled }) =>
    filled ? theme.bgOverlay2 : "transparent"};
`;

export const Con = styled(View)`
  height: 70%;
  width: 100%;
  ${FlexColAround}
`;

export const Title = styled(Header2)`
  color: ${({ theme }) => theme.bgRed};
  width: 80%;
  height: 30%;
`;

export const Message = styled(P1_Bold)`
  color: ${({ theme, filled }) => (filled ? theme.text : theme.text)};
  height: 25%;
  width: 90%;
`;
