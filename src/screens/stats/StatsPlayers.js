import React from "react";
import {
  Players,
  Name,
  Avatar,
  Main,
  PlayerInfo,
  Sub,
  Div,
  Div2,
} from "./StyledStats";

const STATS_PLAYERS = React.memo(
  ({ gameData, route, theme, rematch = false }) => {
    console.log("STAT PLAYER GAMEDATA", gameData);
    console.log(route);
    const { p1_DATA, p2_DATA, settings } = gameData;
    const legOrSet = settings ? settings.legOrSet : gameData.legOrSet;

    const p1 = settings ? settings.p1 : gameData.p1;
    const p2 = settings ? settings.p2 : gameData.p2;

    const isSet = legOrSet === "set";
    const p1Main = isSet ? p1_DATA.setsWon : p1_DATA.legsWon;
    const p2Main = isSet ? p2_DATA.setsWon : p2_DATA.legsWon;
    const p1Sub = isSet ? p1_DATA.legsWon : null;
    const p2Sub = isSet ? p2_DATA.legsWon : null;

    return (
      <Players theme={theme}>
        <PlayerInfo>
          <>
            {/assets/.test(p1.img) || p1.img === "" ? (
              <Avatar
                rematch={rematch}
                source={require("../../../assets/bg.png")}
              />
            ) : (
              <Avatar rematch={rematch} source={{ uri: p1.img }} />
            )}
          </>
          <Name rematch={rematch} theme={theme}>
            {p1.key}
          </Name>
        </PlayerInfo>
        {rematch ? null : (
          <Div>
            <Div2>
              <Main theme={theme}>{p1Main}</Main>
              <Main theme={theme}>{p2Main}</Main>
            </Div2>
            {isSet && route.name !== "stats_saved" ? (
              <Div2>
                <Sub theme={theme}>({p1Sub})</Sub>
                <Sub theme={theme}>({p2Sub})</Sub>
              </Div2>
            ) : null}
          </Div>
        )}

        <PlayerInfo>
          <>
            {/assets/.test(p2.img) || p2.img === "" ? (
              <Avatar
                rematch={rematch}
                source={require("../../../assets/bg.png")}
              />
            ) : (
              <Avatar rematch={rematch} source={{ uri: p2.img }} />
            )}
          </>
          <Name rematch={rematch}>{p2.key}</Name>
        </PlayerInfo>
      </Players>
    );
  },
);
export default STATS_PLAYERS;
