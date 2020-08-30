import React from "react";
import { Players } from "./StyledStats";
import PLAYER from "../../components/players/Player";
import PLAYERS_LEGSET from "../../components/players/PlayersLegSet";

const STATS_PLAYERS = React.memo(
  ({ gameData, route, theme, rematch = false, action = null }) => {
    console.log("STAT PLAYER GAMEDATA", gameData);
    console.log(route);
    const { settings } = gameData;

    const p1 = settings ? settings.p1 : gameData.p1;
    const p2 = settings ? settings.p2 : gameData.p2;

    return (
      <Players theme={theme}>
        <PLAYER
          player={p1}
          theme={theme}
          active={false}
          action={() => (action ? action(p1.key) : {})}
        />
        {rematch ? null : (
          <PLAYERS_LEGSET gameData={gameData} route={route} theme={theme} />
        )}
        <PLAYER
          player={p2}
          theme={theme}
          active={false}
          action={() => (action ? action(p2.key) : {})}
        />
      </Players>
    );
  },
);
export default STATS_PLAYERS;
