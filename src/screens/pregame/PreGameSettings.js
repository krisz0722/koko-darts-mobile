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
import { GameContext } from "../../contexts/GameContext";
const PREGAME_SETTINGS = ({ navigation }) => {
  const { theme, animation } = useContext(ThemeContext);
  const { dispatchInGameSettings } = useContext(InGameSettingsContext);
  const { dispatchGameData } = useContext(GameContext);
  const isFocused = useIsFocused();

  const {
    settings,
    dispatchSettings,
    settings: { p1, p2, legOrSet, toWin, legsPerSet, startingScore },
  } = useContext(SettingsContext);

  const [stateLegOrSet, setLegOrSet] = useState(legOrSet);
  const [stateStartingScore, setStartingScore] = useState(startingScore);
  const [stateToWin, setTowin] = useState(toWin);
  const [stateLegsPerSet, setLegsPerSet] = useState(legsPerSet);
  const [stateP1, setP1] = useState(p1);
  const [stateP2, setP2] = useState(p2);
  const [modal, setModal] = useState(
    p2 === "GUEST" || (p2.key === "" && isFocused) ? true : false,
  );

  const newGameSettings = {
    ...settings,
    p1: stateP1,
    p2: stateP2,
    legOrSet: stateLegOrSet,
    startingScore: stateStartingScore,
    toWin: stateToWin,
    legsPerSet: stateLegsPerSet,
  };

  useEffect(() => {
    if (isFocused) {
    } else {
      dispatchSettings({
        type: "CHOOSE_OPPONENT",
        value: p2,
      });
    }
  }, [p2, dispatchSettings, isFocused]);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("homenavigator");
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  const toggleSwap = useCallback(() => {
    setP1(stateP2);
    setP2(stateP1);
  }, [stateP1, stateP2]);

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
      dispatchGameData({ type: "LOAD_SETTINGS", value: newGameSettings });
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
    const guest = { key: "GUEST", img: "" };
    setModal(false);
    if (stateP2 === p1) {
      setP1(guest);
    } else {
      setP2(guest);
    }
  };

  const chooseProfile = (val) => {
    if (stateP2 === p1) {
      setP1(val);
    } else {
      setP2(val);
    }
  };

  const handleModal = () => {
    if (p2 !== "" && p2) {
      setModal(false);
    }
  };

  return (
    <>
      <PLAYERS toggleSwap={toggleSwap} p1={stateP1} p2={stateP2} />
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
          action={() => navigation.navigate("homenavigator")}
        />
        <THEMED_BUTTON
          size={"small"}
          text={"change opponent"}
          type={"active"}
          length={3}
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
        p1={stateP1}
        p2={stateP2}
        chooseGuest={chooseGuest}
        chooseProfile={chooseProfile}
        handleModal={handleModal}
        visible={modal}
      />
    </>
  );
};

export default PREGAME_SETTINGS;
