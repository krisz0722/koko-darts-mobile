import styled from "styled-components";
import React from "react";
import { Text, View, Image } from "react-native";
import {
  BasicTextBold,
  Border,
  Window,
  FlexColAround,
  FlexRowAround,
  FlexCol,
} from "../../styles/css_mixins";

export const Players = styled(View)`
  width: 100%;
  ${FlexRowAround};
  height: 25%;
  border-bottom-width: ${({ theme }) => theme.borderWidth};
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const Players2 = styled(Players)`
  position: absolute;
  top: 30%;
  height: 40%;
  border-bottom-width: 0;
  ${FlexColAround};
`;

export const PlayerInfo = styled(View)`
  width: ${() => 100 / 3 + "%"};
  height: 90%;
  border-radius: 4px;
  ${FlexColAround}
`;

export const PlayerInfo2 = styled(PlayerInfo)`
  height: 50%;
`;

export const Avatar = styled(Image)`
  width: ${({ rematch }) =>
    rematch ? Window.width * 0.3 : Window.width * 0.2};
  height: ${({ rematch }) =>
    rematch ? Window.width * 0.3 : Window.width * 0.2};
  border-radius: 4px;
  ${Border(({ theme }) => theme.text)};
`;

export const Name = styled(Text)`
  color: white;
  display:${({ rematch }) => (rematch ? "none" : "flex")}
  font-size: ${({ theme }) => theme.stats.name};
  ${BasicTextBold};
`;

export const Main = styled(Text)`
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.stats.scoreMain};
  ${BasicTextBold};
`;

export const Main2 = styled(Main)`
  width: 100%;
  padding: 5%;
  font-size: ${({ theme }) => theme.stats.scoreSub};
  line-height: ${({ theme }) => theme.stats.scoreSub * 2};
  border-bottom-width: ${({ theme }) => theme.borderWidth};
  border-top-width: ${({ theme }) => theme.borderWidth};

  border-color: ${({ theme }) => theme.borderColor};
`;

export const Sub = styled(Text)`
  color: white;
  font-size: ${({ theme }) => theme.stats.scoreSub};
  ${BasicTextBold};
`;

export const Row = styled(View)`
  height: ${() => (100 - 37.5) / 12 + "%"};
  width: 100%;
  ${FlexRowAround};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const Div = styled(View)`
  ${FlexColAround};
  width: ${() => 100 / 3 + "%"};
  height: 60%;
`;

export const Stat = styled(Text)`
  ${FlexColAround};
  ${BasicTextBold};
  color: white;
  width: 50%;
  height: 80%;
  font-size: ${({ theme }) => theme.stats.stat};
  background-color: rgba(255, 255, 255, 0.1);
`;

export const StatSide = styled(Stat)`
  width: 25%;
`;

export const Div2 = styled(View)`
  ${FlexRowAround};
  width: 100%;
  height: 40%;
`;

export const BottomButtons = styled(View)`
  ${FlexRowAround};
  position: absolute;
  bottom: 0;
  height: 12.5%;
  width: 100%;
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-bottom-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const BottomButtons2 = styled(BottomButtons)`
  position: relative;
  height: 20%;
  width: 100%;
`;

export const Header = styled(Text)`
  ${BasicTextBold};
  height: 17.5%;
  ${FlexCol};
  width: 100%;
  padding: 0 2%;
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.stats.header};
`;
