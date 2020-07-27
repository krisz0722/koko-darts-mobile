import React, { useContext, useEffect } from "react";
import ShapeThrow from "../../../../assets/shapeThrow";
import {
  View_Headers,
  Text_Title,
  View_Shape,
  View_Screen,
} from "./StyledMatchIsFinished";
import { Text_Subtitle } from "../legisfinished/StyledLegIsFinished";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { GameContext } from "../../../contexts/GameContext";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CUSTOM_TAB_NAVIGATOR from "../../../navigators/CustomTabNavigator";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { InGameSettingsContext } from "../../../contexts/InGameSettingsContext";

const MATCH_IS_FINISHED = (props) => {
  const { theme } = useContext(ThemeContext);

  const {
    dispatchGameData,
    gameData,
    gameData: { winner },
  } = useContext(GameContext);

  const { dispatchSettings, settings } = useContext(SettingsContext);
  const { dispatchInGameSettings } = useContext(InGameSettingsContext);

  const navigation = useNavigation();

  const winnerName = winner ? gameData[winner].key : "";

  useEffect(() => {
    const backAction = () => {
      (async () => {
        const dispatch = () => {
          dispatchInGameSettings({ type: "LOAD_SETTINGS", value: settings });
          dispatchGameData({ type: "LOAD_SETTINGS", value: settings });
        };

        await dispatch();

        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "homenavigator" }],
          }),
        );
      })();
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );
    return () => backHandler.remove();
  }, [
    settings,
    dispatchGameData,
    dispatchInGameSettings,
    dispatchSettings,
    navigation,
  ]);

  const TABS = [
    {
      route: "homenavigator",
      text: "quit match",
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
      text: "show stats",
      icon: "show-chart",
      action: () => navigation.navigate("game"),
    },
    {
      route: "rematch",
      text: "rematch",
      icon: "dart",
      action: () => navigation.navigate("rematch"),
    },
  ];

  return (
    <View_Screen>
      <View_Headers theme={theme}>
        <Text_Title
          theme={theme}
        >{`${winnerName} has won the match!`}</Text_Title>
        <Text_Subtitle theme={theme}>congratulations!</Text_Subtitle>
      </View_Headers>
      <View_Shape theme={theme}>
        <ShapeThrow fill={theme.bg3} />
      </View_Shape>
      <CUSTOM_TAB_NAVIGATOR tabs={TABS} />
    </View_Screen>
  );
};

export default MATCH_IS_FINISHED;
