import styled from "styled-components";
import {
  BasicText,
  BorderHorizontal,
  FlexCol,
  FlexColStart,
  FlexRow,
} from "../../styles/css_mixins";
import { Text, View } from "react-native";

export const HeaderWelcome = styled(Text)`
  ${BasicText}
  text-align-vertical: bottom;
  width: 100%;
  height: 20%;
  padding-bottom:5%;
  color: ${({ theme }) => theme.text}
  font-size: 30;
`;

export const Info = styled(View)`
  width: 100%;
  height: 20%;
  ${FlexColStart};
`;

export const InfoStats = styled(View)`
  ${FlexCol};
  width: 100%;
  height: 100%;
  ${BorderHorizontal(({ theme }) => theme.borderColor)}
`;

export const InfoTitle = styled(Text)`
  ${BasicText}
  width: 100%;
  height: 10%;
  ${FlexRow};
  color: ${({ theme }) => theme.text};
  font-size: 20;
  background-color: ${({ theme, unfinished }) =>
    unfinished ? theme.bgRed : "transparent"};
`;

export const InfoRow = styled(View)`
  ${FlexRow};
  width: 100%;
  height: 20%;
`;

export const InfoText = styled(Text)`
  ${BasicText};
  text-align: left;
  width: 40%;
  ${FlexRow};
  color: white;
  font-size: 15;
`;

export const InfoText2 = styled(InfoText)`
  text-align: right;
`;

export const Buttons = styled(View)`
  ${FlexCol};
  padding: ${({ unfinished }) => (unfinished ? "5% 0%" : "10% 0")};
  height: 42%;
  width: 100%;
`;

// border: 2px green solid;
