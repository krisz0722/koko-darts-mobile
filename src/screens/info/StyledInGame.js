import styled from "styled-components";
import { View } from "react-native";
import { FlexCol, FlexRowAround } from "../../styles/css_mixins";
import { Header3 } from "../../components/headers/StyledHeaders";

export const InfoCon = styled(View)`
  height: 100%;
  ${FlexCol};
`;

export const Title = styled(Header3)`
  width: 100%;
  padding: 5%;
  line-height: ${({ theme }) => theme.stats.scoreSub * 2};
  border-bottom-width: ${({ theme }) => theme.borderWidth};
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const Players = styled(View)`
  width: 100%;
  ${FlexRowAround};
  height: 25%;
`;
