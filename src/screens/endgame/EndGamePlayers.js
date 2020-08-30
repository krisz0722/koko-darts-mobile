import React from "react";
import { Players } from "./StyledEndGame";
import PLAYER from "../../components/players/Player";
import PLAYERS_LEGSET from "../../components/players/PlayersLegSet";

const ENDGAME_PLAYER = React.memo(
  ({
    gameData,
    route,
    theme,
    large = false,
    action = null,
    activePlayerName,
    bottom = false,
  }) => {
    const { settings } = gameData;

    const p1 = settings ? settings.p1 : gameData.p1;
    const p2 = settings ? settings.p2 : gameData.p2;

    return (
      <Players border={bottom} theme={theme}>
        <PLAYER
          large={large}
          player={p1}
          theme={theme}
          active={activePlayerName === p1.key}
          action={() => (action ? action(p1.key) : {})}
        />
        {large ? null : (
          <PLAYERS_LEGSET gameData={gameData} route={route} theme={theme} />
        )}
        <PLAYER
          large={large}
          player={p2}
          theme={theme}
          active={activePlayerName === p2.key}
          action={() => (action ? action(p2.key) : {})}
        />
      </Players>
    );
  },
);
export default ENDGAME_PLAYER;
