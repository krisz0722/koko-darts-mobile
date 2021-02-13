import React from "react";
import { Main, Sub, Div, Div2 } from "./StyledPlayerLegSet";
import { useRoute } from "@react-navigation/native";

const PLAYERS_LEGSET = React.memo(({ gameData, theme }) => {
  const { p1_DATA, p2_DATA, settings } = gameData;
  const legOrSet = settings ? settings.legOrSet : gameData.legOrSet;

  const isSet = legOrSet === "set";
  const p1Main = isSet ? p1_DATA.setsWon : p1_DATA.legsWon;
  const p2Main = isSet ? p2_DATA.setsWon : p2_DATA.legsWon;
  const p1Sub = isSet ? p1_DATA.legsWon : null;
  const p2Sub = isSet ? p2_DATA.legsWon : null;
  const route = useRoute().name;

  return (
    <Div>
      <Div2>
        <Main theme={theme}>{p1Main}</Main>
        <Main theme={theme}>{p2Main}</Main>
      </Div2>
      {isSet && route !== "stats_saved" ? (
        <Div2>
          <Sub theme={theme}>({p1Sub})</Sub>
          <Sub theme={theme}>({p2Sub})</Sub>
        </Div2>
      ) : null}
    </Div>
  );
});
export default PLAYERS_LEGSET;
