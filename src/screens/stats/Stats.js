import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import { ThemeContext } from "../../contexts/ThemeContext";
import {
  Players,
  Name,
  Avatar,
  Main,
  PlayerInfo,
  Sub,
  Div,
  BottomButtons,
  Row,
  Div2,
  Stat,
  StatSide,
} from "./StyledStats";
import { GameContext } from "../../contexts/GameContext";
import { ScreenContainer } from "../../navigators/AppNavigator";

const STATS = React.memo(({ navigation, route }) => {
  const { settings } = useContext(SettingsContext);

  let { theme } = useContext(ThemeContext);
  const { gameData } = useContext(GameContext);

  const stats = route.params ? route.params.gameData : gameData;
  theme = route.params ? route.params.theme : theme;

  const back = route.params ? route.params.back : "home";

  const { p1_DATA, p2_DATA } = stats;

  const legOrSet = route.params
    ? route.name === "stats_saved"
      ? stats.matchSummary.legOrSet
      : settings.legOrSet
    : null;

  const p1 = route.params
    ? route.name === "stats_saved"
      ? stats.p1
      : gameData.settings.p1
    : {
        key: null,
      };
  const p2 = route.params
    ? route.name === "stats_saved"
      ? stats.p2
      : gameData.settings.p2
    : {
        key: null,
      };

  const isSet = legOrSet === "set";
  const p1Main = isSet ? p1_DATA.setsWon : p1_DATA.legsWon;
  const p2Main = isSet ? p2_DATA.setsWon : p2_DATA.legsWon;
  const p1Sub = isSet ? null : p1_DATA.legsWon;
  const p2Sub = isSet ? null : p2_DATA.legsWon;

  const TEXT = [
    "match average",
    "best leg -average",
    "best leg - darts use",
    "first nine average",
    "scoring darts average",
    "highest checkout",
    "checkout percentage",
    "60+",
    "80+",
    "100+",
    "140+",
    "180",
  ];

  const DATA = [
    "avgMatch",
    "bestAvgLeg",
    "bestLegByDartsUsed",
    "avgFirstNine",
    "avgScoring",
    "highestCheckout",
    "doublePercentage",
    60,
    80,
    100,
    140,
    180,
  ];
  return (
    <ScreenContainer theme={theme}>
      <Players theme={theme}>
        <PlayerInfo>
          <>
            {p1.img === "" ? (
              <Avatar source={require("../../../assets/bg.png")} />
            ) : (
              <Avatar source={{ uri: p1.img }} />
            )}
          </>
          <Name theme={theme}>{p1.key}</Name>
        </PlayerInfo>
        <Div>
          <Div2>
            <Main theme={theme}>{p1Main}</Main>
            <Main theme={theme}>{p2Main}</Main>
          </Div2>
          {legOrSet === "set" && route.name !== "stats_saved" ? (
            <Div2>
              <Sub theme={theme}>({p1Sub})</Sub>
              <Sub theme={theme}>({p2Sub})</Sub>
            </Div2>
          ) : null}
        </Div>
        <PlayerInfo>
          <>
            {p2.img === "" ? (
              <Avatar source={require("../../../assets/bg.png")} />
            ) : (
              <Avatar source={{ uri: p2.img }} />
            )}
          </>
          <Name>{p2.key}</Name>
        </PlayerInfo>
      </Players>
      {TEXT.map((item) => {
        const index = TEXT.indexOf(item);
        const data = DATA[index];
        const p1 =
          typeof p1_DATA[data] === "number" && typeof data !== "number"
            ? p1_DATA[data].toFixed(1)
            : p1_DATA[data];
        const p2 =
          typeof p2_DATA[data] === "number" && typeof data !== "number"
            ? p2_DATA[data].toFixed(1)
            : p2_DATA[data];

        return (
          <Row>
            <StatSide theme={theme}>{p1}</StatSide>
            <Stat theme={theme}>{item}</Stat>
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
  );
});
export default STATS;
