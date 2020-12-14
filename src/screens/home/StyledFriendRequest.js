import styled from "styled-components/native";
import { FlexRow, FlexRowEnd, Window } from "../../styles/css_mixins";
import { Image, View } from "react-native";
import { P2_Bold } from "../../components/headers/StyledHeaders";

export const TopBar = styled(View)`
  top: 0;
  position: absolute;
  height: ${({ friendRequestReceived }) =>
    friendRequestReceived ? "10%" : "7.5%"};
  width: ${({ friendRequestReceived }) =>
    friendRequestReceived ? "100%" : "100%"};
  ${FlexRowEnd};

  background-color: ${({ theme, friendRequestReceived }) =>
    friendRequestReceived ? theme.bg2 : "transparent"};
  border-bottom-width: ${({ theme, friendRequestReceived }) =>
    friendRequestReceived ? theme.borderWidth : 0};
  border-color: ${({ theme }) => theme.borderColor};
  flex-direction: ${({ friendRequestReceived }) =>
    friendRequestReceived ? "column" : "row"};
`;

export const Friendrequest = styled(View)`
  width: 100%;
  height: 100%;
  ${FlexRow};
  padding-left: 2%;
`;

export const Friend = styled(View)`
  width: 70%;
  height: 60%;
  ${FlexRow};
`;

export const FriendName = styled(P2_Bold)`
  color: ${({ theme }) => theme.text2};
`;

export const FriendMessage = styled(P2_Bold)`
  height: 30%;
`;

export const TopButtons = styled(View)`
  width: 30%;
  ${FlexRow};
`;

export const FriendAvatar = styled(Image)`
  width: ${() => Window.height * 0.05};
  height: ${() => Window.height * 0.05};
  border-radius: ${() => Window.height * 0.075};
  border-width: ${({ theme }) => theme.borderWidth}
  border-color: ${({ theme }) => theme.text}
  margin-right:5%;
`;
