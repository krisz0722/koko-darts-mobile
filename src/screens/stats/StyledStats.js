import styled from "styled-components";
import { View, Image } from "react-native";
import {
  BasicTextBold,
  Border,
  Window,
  FlexColAround,
  FlexRowAround,
} from "../../styles/css_mixins";
import {
  Header1,
  Header2,
  Header3,
  P2_Bold,
} from "../../components/headers/StyledHeaders";

export const Players = styled(View)`
  width: 100%;
  ${FlexRowAround};
  height: 25%;
  border-bottom-width: ${({ theme }) => theme.borderWidth};
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
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

export const Name = styled(P2_Bold)`
  display: ${({ rematch }) => (rematch ? "none" : "flex")} ${BasicTextBold};
`;

export const Main = styled(Header1)``;

export const Sub = styled(Header3)``;

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

export const Stat = styled(P2_Bold)`
  width: 50%;
  height: 80%;
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

export const Header = styled(Header2)`
  height: 17.5%;
  width: 100%;
  padding: 0 2%;
`;
