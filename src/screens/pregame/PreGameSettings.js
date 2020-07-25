import React, { useCallback, useContext, useEffect, useState } from "react";
import { OptionsScore } from "../settings/OptionsScore";
import { OptionsLegOrSet } from "../settings/OptionsLegOrSet";
import HISTORY from "./History";
import PLAYERS from "./Players";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import { BackHandler } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { BottomButtons } from "./StyledPreGame";
import { InGameSettingsContext } from "../../contexts/InGameSettingsContext";
import CHOOSE_PLAYER_MODAL from "../../components/modals/ChoosePlayerModal";
import { useIsFocused } from "@react-navigation/native";
import { SettingsContext } from "../../contexts/SettingsContext";
const PREGAME_SETTINGS = ({ navigation }) => {
  const { theme, animation } = useContext(ThemeContext);

  const {
    inGameSettings,
    dispatchInGameSettings,
    inGameSettings: { p1, p2, legOrSet, toWin, legsPerSet, startingScore },
  } = useContext(InGameSettingsContext);

  const isFocused = useIsFocused();

  const [stateLegOrSet, setLegOrSet] = useState(legOrSet);
  const [stateStartingScore, setStartingScore] = useState(startingScore);
  const [stateToWin, setTowin] = useState(toWin);
  const [stateLegsPerSet, setLegsPerSet] = useState(legsPerSet);
  const [modal, setModal] = useState(
    p2 === "GUEST" || (!p2 && isFocused) ? true : false,
  );
  const [change, setChange] = useState(false);
  const [stateP2, setP2] = useState(p2);

  const newGameSettings = {
    ...inGameSettings,
    p1,
    p2,
    legOrSet: stateLegOrSet,
    startingScore: stateStartingScore,
    toWin: stateToWin,
    legsPerSet: stateLegsPerSet,
  };

  const { dispatchSettings } = useContext(SettingsContext);

  console.log("ISFOCUSED", isFocused);

  useEffect(() => {
    if (isFocused) {
      console.log("SETTINGS FOCUSED");
    } else {
      console.log("NOT FOCUSED!!!");
      dispatchSettings({
        type: "CHOOSE_OPPONENT",
        value: p2,
      });
    }
  }, [p2, dispatchSettings, isFocused]);

  console.log("NEW GAME SAETTINGS", newGameSettings);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("home");
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  const toggleLegOrSet = useCallback(
    (value) => {
      setLegOrSet(value);
    },
    [setLegOrSet],
  );
  const toggleStartingScore = useCallback(
    (value) => {
      setStartingScore(value);
    },
    [setStartingScore],
  );

  const toggleToWin = useCallback(
    (value) => {
      setTowin(value);
    },
    [setTowin],
  );

  const toggleLegsPerSet = useCallback(
    (value) => {
      setLegsPerSet(value);
    },
    [setLegsPerSet],
  );

  const startGame = () => {
    if (p2 === "choose") {
      setModal(true);
    } else {
      dispatchInGameSettings({ type: "LOAD_SETTINGS", value: newGameSettings });
      navigation.navigate("game");
    }
  };

  const changeOpponent = (back = false) => {
    if (back) {
      navigation.goBack();
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const chooseGuest = () => {
    dispatchInGameSettings({ type: "CHOOSE_OPPONENT", value: "GUEST" });
    setModal(false);
  };
  const chooseProfile = () => {
    setModal(false);
  };

  return (
    <>
      <PLAYERS />
      <OptionsScore
        startingScore={stateStartingScore}
        toggleStartingScore={toggleStartingScore}
        page={"pregame"}
        theme={theme}
      />
      <OptionsLegOrSet
        legOrSet={stateLegOrSet}
        toggleLegOrSet={toggleLegOrSet}
        toWin={stateToWin}
        toggleToWin={toggleToWin}
        legsPerSet={stateLegsPerSet}
        toggleLegsPerSet={toggleLegsPerSet}
        page={"pregame"}
        theme={theme}
        animation={animation}
      />
      <HISTORY theme={theme} />
      <BottomButtons theme={theme}>
        <THEMED_BUTTON
          text={"back"}
          length={3}
          size={"small"}
          icon={"arrow-back"}
          type={"danger"}
          action={() => changeOpponent(true)}
        />
        <THEMED_BUTTON
          size={"small"}
          text={"change opponent"}
          type={"danger"}
          length={3}
          icon={"person"}
          action={() => changeOpponent(false)}
        />
        <THEMED_BUTTON
          size={"small"}
          text={"game on!"}
          type={"success"}
          length={3}
          icon={"dart"}
          action={startGame}
        />
      </BottomButtons>
      <CHOOSE_PLAYER_MODAL
        change={change}
        p2={p2}
        chooseGuest={chooseGuest}
        chooseProfile={chooseProfile}
        visible={modal}
      />
    </>
  );
};

export default PREGAME_SETTINGS;
