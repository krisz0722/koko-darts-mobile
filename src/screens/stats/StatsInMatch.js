import React, { useContext } from "react";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import { ThemeContext } from "../../contexts/ThemeContext";
import { BottomButtons, Row, Stat, StatSide } from "./StyledStats";
import { GameContext } from "../../contexts/GameContext";
import STATS_PLAYERS from "./StatsPlayers";
import STATS_DATA from "./StatsDataModel";
import { AppBackground } from "../../../App";
import { ScreenContainer } from "../../navigators/StyledNav";

const STATS_INGAME = React.memo(({ navigation, route }) => {
  let { gameData } = useContext(GameContext);
  let {
    theme,
    themeContext: { background },
  } = useContext(ThemeContext);

  gameData = route.params ? route.params.gameData : gameData;
  theme = route.params ? route.params.theme : theme;

  const back = route.params ? route.params.back : "home";

  const { p1_DATA, p2_DATA } = gameData;

  return (
    <>
      {background ? (
        <AppBackground
          source={require("../../../assets/bg.png")}
          resizeMode="cover"
        />
      ) : null}
      <ScreenContainer theme={theme}>
        <STATS_PLAYERS route={route} theme={theme} gameData={gameData} />
        {STATS_DATA.map((item, i) => {
          const p1 = item.rounding
            ? p1_DATA[item.data].toFixed(item.rounding)
            : p1_DATA[item.data];
          const p2 = item.rounding
            ? p2_DATA[item.data].toFixed(item.rounding)
            : p2_DATA[item.data];
          return (
            <Row key={i}>
              <StatSide theme={theme}>{p1}</StatSide>
              <Stat theme={theme}>{item.name}</Stat>
              <StatSide theme={theme}>{p2}</StatSide>
            </Row>
          );
        })}
        <BottomButtons theme={theme}>
          <THEMED_BUTTON
            size={"small"}
            text={"back"}
            type={"active"}
            length={2}
            action={() => {
              navigation.navigate(back);
            }}
            inGameTheme={theme}
          />
        </BottomButtons>
      </ScreenContainer>
    </>
  );
});
export default STATS_INGAME;
