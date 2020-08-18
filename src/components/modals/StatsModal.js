import React, { useContext } from "react";
import { Modal } from "react-native";
import THEMED_BUTTON from "../buttons/ThemedButton";
import { BottomButtons } from "./StyledModal";
import { ThemeContext } from "../../contexts/ThemeContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import {
  Avatar,
  Div,
  Div2,
  Main,
  Name,
  PlayerInfo,
  Players,
  Row,
  Stat,
  StatSide,
  Sub,
} from "../../screens/stats/StyledStats";

const STATS_MODAL = ({ gameData, action, visible }) => {
  const { theme, animation } = useContext(ThemeContext);

  const animationType = animation
    ? theme.name === "default"
      ? "fade"
      : "slide"
    : "none";

  const {
    settings: { legOrSet },
  } = useContext(SettingsContext);

  const { p1_DATA, p2_DATA } = gameData;

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
    "60",
    "80",
    "100",
    "140",
    "180",
  ];
  return (
    <Modal
      animationType={animationType}
      transparent={true}
      presentationStyle={"pageSheet"}
      visible={visible}
    >
      <>
        <Players theme={theme}>
          <PlayerInfo>
            <Avatar />
            <Name theme={theme}>{"laci"}</Name>
          </PlayerInfo>
          <Div>
            <Div2>
              <Main theme={theme}>{p1Main}</Main>
              <Main theme={theme}>{p2Main}</Main>
            </Div2>
            {legOrSet === "set" ? (
              <Div2>
                <Sub theme={theme}>({p1Sub})</Sub>
                <Sub theme={theme}>({p2Sub})</Sub>
              </Div2>
            ) : null}
          </Div>
          <PlayerInfo>
            <Avatar />
            <Name>{"michael schumacher"}</Name>
          </PlayerInfo>
        </Players>
        {TEXT.map((item) => {
          const index = TEXT.indexOf(item);
          const data = DATA[index];

          return (
            <Row>
              <StatSide theme={theme}>{p1_DATA[data]}</StatSide>
              <Stat theme={theme}>{item}</Stat>
              <StatSide theme={theme}>{p2_DATA[data]}</StatSide>
            </Row>
          );
        })}
        <BottomButtons theme={theme}>
          <THEMED_BUTTON
            size={"small"}
            text={"back"}
            type={"active"}
            length={2}
            action={() => action()}
          />
        </BottomButtons>
      </>
    </Modal>
  );
};

export default STATS_MODAL;

//TODO replace this with activityi indicator aligned to async post (save game)
