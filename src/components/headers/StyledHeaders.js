import styled from "styled-components";
import { Text } from "react-native";
import { BasicText, BasicTextBold, FlexRow } from "../../styles/css_mixins";

export const TitleBig = styled(Text)`
  ${BasicTextBold}
  color: ${({ theme }) => theme.text};
  font-size: 50;
`;

export const Header1 = styled(Text)`
  ${BasicTextBold}
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.header1};
`;

export const Header2 = styled(Header1)`
  font-size: ${({ theme }) => theme.header2};
`;

export const Header3 = styled(Header1)`
  font-size: ${({ theme }) => theme.header3};
`;

export const Header4 = styled(Header1)`
  font-size: ${({ theme }) => theme.header4};
`;

export const P1 = styled(Text)`
  ${BasicText};
  ${FlexRow};
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.p1};
`;

export const P1_Bold = styled(P1)`
  ${BasicTextBold};
`;

export const P2 = styled(P1)`
  font-size: ${({ theme }) => theme.p2};
`;

export const P2_Bold = styled(P2)`
  ${BasicTextBold};
`;

export const P3 = styled(P1)`
  font-size: ${({ theme }) => theme.p3};
`;

export const P3_Bold = styled(P3)`
  ${BasicTextBold};
`;

export const P4 = styled(P1)`
  font-size: ${({ theme }) => theme.p4};
`;
