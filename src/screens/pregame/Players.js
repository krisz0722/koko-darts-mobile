import React, { useContext } from "react";
import styled from "styled-components";
import { Image, Text, TouchableHighlight, View } from "react-native";
import {
  BasicTextBold,
  Border,
  FlexCol,
  FlexColAround,
  FlexRowAround,
  Window,
} from "../../styles/css_mixins";
import Icon from "react-native-vector-icons/MaterialIcons";

const Players = styled(View)`
  width: 100%;
  ${FlexRowAround};
  height: 25%;
`;

const PlayerInfo = styled(View)`
  width: 40%;
  height: 90%;
  border-radius: 4px;
  ${FlexColAround}
`;

const Avatar = styled(Image)`
  width: ${() => Window.width * 0.3};
  height: ${() => Window.width * 0.3};
  border-radius: 4px;
  ${Border(({ theme }) => theme.text)};
`;

const Name = styled(Text)`
  color: white;
  font-size: ${({ theme }) => theme.pregame.fontSize};
  ${BasicTextBold};
`;

const Swap = styled(TouchableHighlight)`
  width: 10%;
  height: ${() => Window.width * 0.1};
  background-color: ${({ theme }) => theme.bgActive};
  border-radius: 4px;
  ${FlexCol};
`;

export const PLAYERS = ({ toggleSwap, p1, p2 }) => {
  const p1Name = p1 ? p1.key : "";
  const p1Img = p1 ? p1.img : null;
  const p2Name = p2 ? p2.key : "";
  const p2Img = p2 ? p2.img : null;
  return (
    <>
      <Players>
        <PlayerInfo>
          <Avatar source={p1Img} />
          <Name>{p1Name}</Name>
        </PlayerInfo>
        <Swap onPress={toggleSwap}>
          <Icon name={"sync"} size={20} />
        </Swap>
        <PlayerInfo>
          <Avatar source={p2Img} />
          <Name>{p2Name}</Name>
        </PlayerInfo>
      </Players>
    </>
  );
};

export default PLAYERS;
