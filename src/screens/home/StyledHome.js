import styled from "styled-components";
import {
  BasicTextBold,
  BorderVertical,
  FlexCol,
  FlexColBetween,
  FlexColStart,
  FlexRow,
} from "../../styles/css_mixins";
import { Text, View } from "react-native";

export const Header = styled(View)`
  top: 10%;
  height: 15%;
  width: 100%;
  ${FlexCol};
`;

export const HeaderText = styled(Text)`
  ${BasicTextBold}
  text-align-vertical: bottom;
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.home.fontSize1};
`;
export const InfoTitle = styled(Text)`
  top: 20%;
  ${BasicTextBold}
  width: 100%;
  height: 10%;
  ${FlexRow};
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.home.fontSize2};
  background-color: ${({ theme, unfinished }) =>
    unfinished ? theme.bgRed : "transparent"};
`;

export const Info = styled(View)`
  top: 15%;
  width: 100%;
  height: 20%;
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

export const InfoText = styled(Text)`
  ${BasicTextBold};
  text-align: left;
  width: 40%;
  ${FlexRow};
  color: white;
  font-size: ${({ theme }) => theme.home.fontSize3};
`;

export const InfoText2 = styled(InfoText)`
  text-align: right;
`;

export const Buttons = styled(View)`
  ${FlexColBetween};
  width: 100%;
  top: 15%;
  height: 32%;
`;

// border: 2px green solid;
