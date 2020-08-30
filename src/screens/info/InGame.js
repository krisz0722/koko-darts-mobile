import React from "react";
import PLAYER from "../../components/players/Player";
import { Players, InfoCon, Title } from "./StyledInGame";

const PLAYER_IS_IN_GAME = React.memo(
  ({ username, theme, gameData, lastMatch }) => {
    const p1 = lastMatch ? gameData.p1 : gameData.settings.p1;
    const p2 = lastMatch ? gameData.p2 : gameData.settings.p2;
    const opponent = username === p1.key ? p2 : p1;
    const text = "you are currently playing against";

    return (
      <InfoCon>
        <Title theme={theme}>{text}</Title>
        <Players>
          <PLAYER player={opponent} theme={theme} active={false} />
        </Players>
      </InfoCon>
    );
  },
);
export default PLAYER_IS_IN_GAME;
