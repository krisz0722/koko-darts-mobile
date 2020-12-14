import styled from "styled-components/native";
import { View } from "react-native";
import { FlexColAround, FlexRowAround } from "../../styles/css_mixins";
import { Header1, Header3 } from "../headers/StyledHeaders";

export const Main = styled(Header1)``;

export const Main2 = styled(Header3)`
  width: 100%;
  padding: 5%;
  line-height: ${({ theme }) => theme.fonts.stats.scoreSub * 2};
  border-bottom-width: ${({ theme }) => theme.borderWidth};
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const Sub = styled(Header3)``;

export const Div = styled(View)`
  ${FlexColAround};
  width: ${() => 100 / 3 + "%"};
  height: 60%;
`;

export const Div2 = styled(View)`
  ${FlexRowAround};
  width: 100%;
  height: 40%;
`;
