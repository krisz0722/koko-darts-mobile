import styled from "styled-components";
import {
  BorderVertical,
  FlexCol,
  FlexColStart,
  FlexRow,
} from "../../styles/css_mixins";
import { View } from "react-native";
import { Header1, P2 } from "../../components/headers/StyledHeaders";

export const HeaderCon = styled(View)`
  ${FlexCol};
  height: 12.5%;
  ${BorderVertical(({ theme }) => theme.borderColor)}
  border-bottom-width:0;
`;

export const Info = styled(View)`
  width: 100%;
  height: 30%;
  ${FlexColStart};
`;

export const InfoStats = styled(View)`
  ${FlexCol};
  width: 100%;
  height: 100%;
  ${BorderVertical(({ theme }) => theme.borderColor)}
`;

export const InfoRow = styled(View)`
  ${FlexRow};
  width: 100%;
  height: 20%;
`;

export const InfoText = styled(P2)`
  text-align: left;
  width: 50%;
  padding: 0 10%;
  background-color: rgba(255, 255, 255, 0.1);
  height: 70%;
`;

export const InfoText2 = styled(InfoText)`
  text-align: right;
`;

export const FirstMatch = styled(Header1)`
  width: 80%;
`;
