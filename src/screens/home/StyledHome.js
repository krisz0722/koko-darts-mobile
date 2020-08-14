import styled from "styled-components";
import {
  BasicText,
  BasicTextBold,
  BorderVertical,
  FlexCol,
  FlexColAround,
  FlexColBetween,
  FlexColStart,
  FlexRow,
  FlexRowEnd,
  Window,
} from "../../styles/css_mixins";
import { Image, Text, View } from "react-native";

export const TopBar = styled(View)`
  top: 0;
  position: absolute;
  height: ${({ friendRequest }) => (friendRequest ? "10%" : "5%")};
  width: ${({ friendRequest }) => (friendRequest ? "100%" : "100%")};
  ${FlexRowEnd};

  background-color: ${({ theme, friendRequest }) =>
    friendRequest ? theme.bg2 : "transparent"};
  border-bottom-width: ${({ theme, friendRequest }) =>
    friendRequest ? theme.borderWidth : 0};
  border-color: ${({ theme }) => theme.borderColor};
  flex-direction: ${({ friendRequest }) => (friendRequest ? "column" : "row")};
`;

export const OverflowMenu = styled(View)`
  position: absolute;
  top: 5%;
  right: 10%;
  height: 30%;
  width: 50%;
  padding: 0 15%;
  border-radius: 4px;
  z-index: 2;
  ${FlexColAround};
  background-color: ${({ theme }) => theme.bg2};
`;

export const Header = styled(View)`
  top: 10%;
  height: 15%;
  width: 100%;
  ${FlexCol};
`;

export const Friendrequest = styled(View)`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.text};
  ${BasicText};
  ${FlexRow};
  padding-left: 2%;
`;

export const Friend = styled(View)`
  width: 70%;
  height: 60%;
  ${FlexRow};
`;

export const FriendName = styled(Text)`
  ${BasicTextBold};
  font-size: ${({ theme }) => theme.home.fontSize3};
  color: ${({ theme }) => theme.text2};
`;
export const FriendMessage = styled(Text)`
  ${BasicTextBold};
  height: 30%;
  font-size: ${({ theme }) => theme.home.fontSize3};
  color: ${({ theme }) => theme.text};
`;

export const TopButtons = styled(View)`
  width: 30%;
  ${FlexRow};
`;

export const LogOut = styled(View)`
  ${FlexRowEnd};
`;

export const FriendAvatar = styled(Image)`
  width: ${() => Window.height * 0.05};
  height: ${() => Window.height * 0.05};
  border-radius: ${() => Window.height * 0.075};
  border-width: ${({ theme }) => theme.borderWidth}
  border-color: ${({ theme }) => theme.text}
  margin-right:5%;
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
