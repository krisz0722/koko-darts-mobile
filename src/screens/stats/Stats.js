import React, { useContext } from "react";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import { ThemeContext } from "../../contexts/ThemeContext";
import { BottomButtons, Row, Stat, StatSide } from "./StyledStats";
import { GameContext } from "../../contexts/GameContext";
import { AppBackground } from "../../../App";
import { ScreenContainer } from "../../navigators/AppNavigator";
import STATS_PLAYERS from "./StatsPlayers";

const DATA = [
  {
    name: "match average",
    data: "avgMatch",
    rounding: 1,
  },
  {
    name: "best leg - average",
    data: "bestAvgLeg",
    rounding: 1,
  },
  {
    name: "best leg - darts used",
    data: "bestLegByDartsUsed",
    rounding: 0,
  },
  {
    name: "first nine average",
    data: "avgFirstNine",
    rounding: 1,
  },
  {
    name: "scoring darts average",
    data: "avgScoring",
    rounding: 1,
  },
  {
    name: "highest checkout",
    data: "highestCheckout",

    rounding: 0,
  },
  {
    name: "checkout percentage",
    data: "doublePercentage",
    rounding: false,
  },
  {
    name: "60+",
    data: 60,
    rounding: 0,
  },
  {
    name: "80+",
    data: 80,
    rounding: 0,
  },
  {
    name: "100+",
    data: 100,
    rounding: 0,
  },
  {
    name: "140+",
    data: 140,
    rounding: 0,
  },

  {
    name: "180",
    data: 180,
    rounding: 0,
  },
];

const STATS = React.memo(({ navigation, route }) => {
  let { gameData } = useContext(GameContext);
  let { theme } = useContext(ThemeContext);

  gameData = route.params ? route.params.gameData : gameData;
  theme = route.params ? route.params.theme : theme;

  const back = route.params ? route.params.back : "home";
  const { p1_DATA, p2_DATA } = gameData;

  return (
    <>
      <AppBackground
        source={require("../../../assets/bg.png")}
        resizeMode="cover"
      />
      <ScreenContainer theme={theme}>
        <STATS_PLAYERS route={route} theme={theme} gameData={gameData} />
        {DATA.map((item) => {
          const p1 = item.rounding
            ? p1_DATA[item.data].toFixed(item.rounding)
            : p1_DATA[item.data];
          const p2 = item.rounding
            ? p2_DATA[item.data].toFixed(item.rounding)
            : p2_DATA[item.data];
          return (
            <Row>
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
export default STATS;
