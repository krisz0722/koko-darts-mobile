import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import PLAYER from "../../../components/players/Player";
import { Swap, SettingsPreGamePlayers } from "./StyledPreGame";

export const PLAYERS = React.memo(({ theme, toggleSwap, p1, p2 }) => {
  return (
    <SettingsPreGamePlayers>
      <PLAYER large={true} player={p1} theme={theme} />
      <Swap onPress={toggleSwap}>
        <Icon name={"sync"} size={20} />
      </Swap>
      <PLAYER large={true} player={p2} theme={theme} />
    </SettingsPreGamePlayers>
  );
});

export default PLAYERS;
