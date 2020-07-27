import React, { useContext, useState } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import ShapeThrow from "../../../../assets/shapeThrow";
import {
  View_Headers,
  Text_Subtitle,
  Text_Title,
  View_Shape,
  NumOfDarts,
  View_Screen,
} from "./StyledRematch";
import TABNAVIGATOR from "../../../navigators/CustomTabNavigator";
import RADIO_BUTTON_SET from "../../../components/buttons/RadioButtonSet";
import { GameContext } from "../../../contexts/GameContext";
import { ThemeContext } from "../../../contexts/ThemeContext";

import { InGameSettingsContext } from "../../../contexts/InGameSettingsContext";

const REMATCH = () => {
  const { theme } = useContext(ThemeContext);
  const {
    inGameSettings,
    inGameSettings: { startingScore },
    dispatchInGameSettings,
  } = useContext(InGameSettingsContext);

  const {
    dispatchGameData,
    gameData: { p1, p2 },
  } = useContext(GameContext);

  const navigation = useNavigation();

  const [activePlayer, setActivePlayer] = useState(null);
  const [inactivePlayer, setInactivePlayer] = useState(null);

  const handlePLayerToStart = (val) => {
    const active = val === p1.key ? p1 : p2;
    const inactive = active === p1 ? p2 : p1;
    setActivePlayer(active);
    setInactivePlayer(inactive);
  };

  const TABS = [
    {
      route: "homenavigator",
      text: "quit game",
      icon: "arrow-back",
      action: () => navigation.navigate("home"),
    },
    {
      route: "game",
      text: activePlayer ? "game on!" : "select",
      icon: activePlayer ? "check" : "person",
      action: () => {
        if (activePlayer) {
          dispatchGameData({
            type: "REMATCH",
            activePlayer,
            inactivePlayer,
            startingScore,
          });
          dispatchInGameSettings({
            type: "REMATCH",
            p1: activePlayer,
            p2: inactivePlayer,
            value: inGameSettings,
          });
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "game" }],
            }),
          );
        }
        return null;
      },
    },
  ];

  const activePlayerName = activePlayer ? activePlayer.key : "";

  const OPTIONS = [p1.key, p2.key];

  return (
    <View_Screen>
      <View_Headers theme={theme}>
        <Text_Title theme={theme}>throw for the start</Text_Title>
        <Text_Subtitle theme={theme}>
          selec the player to start the next match
        </Text_Subtitle>
        <NumOfDarts>
          <RADIO_BUTTON_SET
            direction={"horizontal"}
            options={OPTIONS}
            action={handlePLayerToStart}
            activeValue={activePlayerName}
          />
        </NumOfDarts>
      </View_Headers>
      <View_Shape theme={theme}>
        <ShapeThrow fill={theme.bg3} />
      </View_Shape>
      <TABNAVIGATOR
        tabs={TABS}
        color={"dark"}
        position={"bottom"}
        length={3}
        direction={"horizontal"}
      />
    </View_Screen>
  );
};

export default REMATCH;
