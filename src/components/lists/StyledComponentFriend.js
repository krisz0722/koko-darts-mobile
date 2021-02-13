import { Image, View } from "react-native";
import styled from "styled-components";
import { FlexRowBetween, Window } from "../../styles/css_mixins";
import { P2 } from "../headers/StyledHeaders";

export const Friend = styled(View)`
  ${FlexRowBetween};
  padding: 0 5%;
  width: 100%;
  margin-top: 10;
  background-color: rgba(255, 255, 255, 0.1);
  height: ${() => Window.height * 0.06};
`;

export const FriendAvatar = styled(Image)`
  width: ${() => Window.height * 0.06};
  height: ${() => Window.height * 0.06};
  border-radius: ${() => Window.height * 0.075};
  border-width: ${({ theme }) => theme.borderWidth}
  border-color: ${({ theme }) => theme.text}
  margin-right:5%;
`;

export const Name = styled(P2)`
  text-align: left;
  width: 65%;
  margin-right: 5%;
`;

export const Record = styled(P2)`
  color: ${({ theme, record }) =>
    record === theme.bgActive ? theme.text2 : theme.text}
  width: 15%;
  border-radius:4px;
  height:65%;
  background-color: ${({ record }) => record}
`;
