import React, { useContext } from "react";
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
import { AppBackground } from "../../../App";
import { ScreenContainer } from "../../navigators/AppNavigator";
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

  const legOrSet = route.params
    ? route.name === "stats_saved"
      ? gameData.matchSummary.legOrSet
      : gameData.settings.legOrSet
    : null;

  const p1 = route.params
    ? route.name === "stats_saved"
      ? gameData.p1
      : gameData.settings.p1
    : {
        key: null,
      };
  const p2 = route.params
    ? route.name === "stats_saved"
      ? gameData.p2
      : gameData.settings.p2
    : {
        key: null,
      };

  const isSet = legOrSet === "set";
  const p1Main = isSet ? p1_DATA.setsWon : p1_DATA.legsWon;
  const p2Main = isSet ? p2_DATA.setsWon : p2_DATA.legsWon;
  const p1Sub = isSet ? p1_DATA.legsWon : null;
  const p2Sub = isSet ? p2_DATA.legsWon : null;

  return (
    <>
      <AppBackground
        source={require("../../../assets/bg.png")}
        resizeMode="cover"
      />
      <ScreenContainer theme={theme}>
        <Players theme={theme}>
          <PlayerInfo>
            <>
              {/assets/.test(p1.img) || p1.img === "" ? (
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
            {isSet && route.name !== "stats_saved" ? (
              <Div2>
                <Sub theme={theme}>({p1Sub})</Sub>
                <Sub theme={theme}>({p2Sub})</Sub>
              </Div2>
            ) : null}
          </Div>
          <PlayerInfo>
            <>
              {/assets/.test(p2.img) || p2.img === "" ? (
                <Avatar source={require("../../../assets/bg.png")} />
              ) : (
                <Avatar source={{ uri: p2.img }} />
              )}
            </>
            <Name>{p2.key}</Name>
          </PlayerInfo>
        </Players>
        {DATA.map((item) => {
          console.log("ITEM", item);
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
