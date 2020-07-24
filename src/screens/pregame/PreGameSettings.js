import React, { useCallback, useContext, useEffect, useState } from "react";
import { OptionsScore } from "../../components/settings/OptionsScore";
import { OptionsLegOrSet } from "../../components/settings/OptionsLegOrSet";
import HISTORY from "./History";
import PLAYERS from "./Players";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import { BackHandler } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Options, BottomButtons } from "./StyledPreGame";
import { InGameSettingsContext } from "../../contexts/InGameSettingsContext";

const PREGAME_SETTINGS = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  const {
    inGameSettings,
    inGameSettings: { legOrSet, toWin, legsPerSet, startingScore },
  } = useContext(InGameSettingsContext);

  console.log(inGameSettings);

  const [stateLegOrSet, setLegOrSet] = useState(legOrSet);
  const [stateStartingScore, setStartingScore] = useState(startingScore);
  const [stateToWin, setTowin] = useState(toWin);
  const [stateLegsPerSet, setLegsPerSet] = useState(legsPerSet);

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

  return (
    <>
      <Options>
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
        />
        <HISTORY theme={theme} />
      </Options>
      <BottomButtons theme={theme}>
        <THEMED_BUTTON
          text={"back"}
          length={2}
          size={"small"}
          icon={"arrow-back"}
          type={"danger"}
          action={() => navigation.goBack()}
        />
        <THEMED_BUTTON
          size={"small"}
          text={"game on!"}
          type={"success"}
          length={2}
          icon={"dart"}
          action={() => {
            navigation.navigate("game");
          }}
        />
      </BottomButtons>
    </>
  );
};

export default PREGAME_SETTINGS;
