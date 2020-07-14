import styled from "styled-components";
import {
  AlignText,
  BasicText,
  BorderVertical,
  FlexCol,
  FlexColEnd,
  FlexColStart,
  FlexRow,
  FlexRowAround,
  FlexRowBetween,
  FlexRowStart,
  BorderHorizontal,
} from "../../styles/css_mixins";
import { Text, View } from "react-native";

export const HeaderWelcome = styled(Text)`
  ${BasicText}
  text-align-vertical: bottom;
  width: 100%;
  height: 20%;
  color: ${({ theme }) => theme.text}
  font-size: 30;
`;

export const Info = styled(View)`
  width: 100%;
  height: 40%;
  ${FlexCol};
`;

export const InfoStats = styled(View)`
  ${FlexCol};
  width: 100%;
  height: 80%;
  ${BorderHorizontal(({ theme }) => theme.borderColor)}
`;

export const InfoTitle = styled(Text)`
  ${BasicText}
  width: 100%;
  height: 20%;
  ${FlexRow};
  color: ${({ theme }) => theme.text};
  font-size: 20;
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
  height: 30%;
  width: 100%;
`;

// border: 2px green solid;
