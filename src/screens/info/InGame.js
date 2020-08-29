import React from "react";
import {
  Name,
  Avatar,
  Players2,
  PlayerInfo2,
  Main2,
} from "../stats/StyledStats";

const PLAYER_IS_IN_GAME = React.memo(
  ({ username, theme, gameData, lastMatch }) => {
    const p1 = lastMatch ? gameData.p1 : gameData.settings.p1;
    const p2 = lastMatch ? gameData.p2 : gameData.settings.p2;
    const opponent = username === p1.key ? p2 : p1;
    const text = "you are currently playing against";

    return (
      <Players2 theme={theme}>
        <Main2 theme={theme}>{text}</Main2>
        <>
          <PlayerInfo2>
            <>
              {p2.img === "" ? (
                <Avatar source={require("../../../assets/bg.png")} />
              ) : (
                <Avatar source={{ uri: opponent.img }} />
              )}
            </>
            <Name>{opponent.key}</Name>
          </PlayerInfo2>
        </>
      </Players2>
    );
  },
);
export default PLAYER_IS_IN_GAME;
