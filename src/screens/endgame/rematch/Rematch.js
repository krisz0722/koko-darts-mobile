import React, { useEffect, useContext, useState } from "react";
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
import EXIT_APP_ALERT from "../../../components/modals/ExitAppAlert";
import { BackHandler } from "react-native";
import { SettingsContext } from "../../../contexts/SettingsContext";

const REMATCH = React.memo(() => {
  const { theme } = useContext(ThemeContext);
  const {
    inGameSettings,
    inGameSettings: { startingScore },
    dispatchInGameSettings,
  } = useContext(InGameSettingsContext);

  const { settings } = useContext(SettingsContext);

  const {
    dispatchGameData,
    gameData: { p1, p2 },
  } = useContext(GameContext);

  const [activePlayer, setActivePlayer] = useState(null);
  const [inactivePlayer, setInactivePlayer] = useState(null);

  const [exitModal, setExitModal] = useState(false);

  const navigation = useNavigation();

  const backAction = () => {
    setExitModal(true);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction,
  );
  useEffect(() => {
    return () => backHandler.remove();
  }, [backHandler]);

  const handleExitApp = () => {
    BackHandler.exitApp();
    setExitModal(!exitModal);
  };

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
      action: () => {
        dispatchInGameSettings({ type: "LOAD_SETTINGS", value: settings });
        dispatchGameData({ type: "LOAD_SETTINGS", value: settings });
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "homenavigator" }],
          }),
        );
      },
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
    <>
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
      <EXIT_APP_ALERT
        action1={() => setExitModal(!exitModal)}
        action2={handleExitApp}
        visible={exitModal}
      />
    </>
  );
});

export default REMATCH;
