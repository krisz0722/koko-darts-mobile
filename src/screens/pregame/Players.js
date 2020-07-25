import React, { useContext } from "react";
import styled from "styled-components";
import { Text, TouchableHighlight, View } from "react-native";
import {
  BasicTextBold,
  Border,
  FlexCol,
  FlexColAround,
  FlexRowAround,
  Window,
} from "../../styles/css_mixins";
import Icon from "react-native-vector-icons/MaterialIcons";
import { InGameSettingsContext } from "../../contexts/InGameSettingsContext";

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

const Avatar = styled(View)`
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

export const PLAYERS = () => {
  const {
    dispatchInGameSettings,
    inGameSettings: { p1, p2 },
  } = useContext(InGameSettingsContext);

  const swap = () => dispatchInGameSettings({ type: "SWAP_PLAYERS", p1, p2 });

  console.log("RENDER PLAYERS");

  return (
    <>
      <Players>
        <PlayerInfo>
          <Avatar />
          <Name>{p1}</Name>
        </PlayerInfo>
        <Swap onPress={swap}>
          <Icon name={"sync"} size={20} />
        </Swap>
        <PlayerInfo>
          <Avatar />
          <Name>{p2}</Name>
        </PlayerInfo>
      </Players>
    </>
  );
};

export default PLAYERS;
