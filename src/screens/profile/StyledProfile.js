import { Text, TouchableHighlight, View } from "react-native";
import styled from "styled-components";
import {
  BasicText,
  BasicTextBold,
  Border,
  FlexCol,
  FlexColAround,
  FlexRow,
  FlexRowBetween,
  Window,
} from "../../styles/css_mixins";

export const Header = styled(View)`
  ${FlexRow};
  height: 30%;
  width: 100%;
`;

export const Container = styled(View)`
  ${FlexColAround};
  width: 40%;
  height: 100%;
`;

export const Container2 = styled(Container)`
  width: 60%;
  border-left-width: 2px;
  border-color: ${({ theme }) => theme.borderColor};
`;

export const SubContainer = styled(View)`
  width: 60%;
  height: ${() => Window.width * 0.4 * 0.6};
  border-radius: 4px;
  ${Border(({ theme }) => theme.borderColor)};
`;

export const Name = styled(Text)`
  ${BasicTextBold};
  font-size: 15;
  font-size: ${({ theme }) => theme.profile.name};
  color: ${({ theme }) => theme.text};
`;

export const Field = styled(View)`
  ${FlexRowBetween};
  width: 100%;
  padding-right: 5%;
  padding-left: 5%;
`;

export const Stat = styled(Text)`
  ${BasicText};
  text-align: left;
  width: 70%;
  font-size: ${({ theme }) => theme.profile.stat};
  color: ${({ theme }) => theme.text};
`;

export const StatValue = styled(Stat)`
  text-align: right;
  width: 30%;
`;

export const NavigationWindow = styled(View)`
  height: 62%;
  width: 100%;
`;
