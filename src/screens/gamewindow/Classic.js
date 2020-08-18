import React, {
  useEffect,
  useRef,
  useContext,
  useState,
  useCallback,
} from "react";
import { Animated, BackHandler } from "react-native";
import CLASSIC_SCORES from "../../components/classic/Scores/ClassicScores";
import CLASSIC_MIDDLE from "../../components/classic/Middle/ClassicMiddle";
import CLASSIC_BOTTOM from "../../components/classic/Bottom/ClassicBottom";
import CLASSIC_TOP from "../../components/classic/Top/ClassicTop";
import CLASSIC_STATS from "../../components/classic/Stats/ClassicStats";
import { GameContext } from "../../contexts/GameContext";
import { GameWindow, Overlay1, Overlay2 } from "./StyledClassic";
import { ThemeContext } from "../../contexts/ThemeContext";
import { InputContextProvider } from "../../contexts/InputContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import EXIT_APP_ALERT from "../../components/modals/ExitAppAlert";
import FINISH_LEG_MODAL from "../../components/modals/FinishLeg";
import FINISH_MATCH_MODAL from "../../components/modals/FinishMatch";
import REMATCH_MODAL from "../../components/modals/Rematch";

const GAME_CLASSIC = React.memo((props) => {
  const { ingame = true, preview, settings = null } = props;

  const {
    gameData,
    gameData: {
      p1_DATA,
      p2_DATA,
      isLegOver,
      isMatchOver,
      isRematch,
      activePlayer,
      inactivePlayer,
    },
  } = useContext(GameContext);
  const inGameSettings = gameData.settings;

  const { theme, animation } = useContext(ThemeContext);

  const animationToUse = ingame ? inGameSettings.animation : animation;
  const settingsToUse = ingame ? inGameSettings : settings;
  const themeToUse = ingame ? inGameSettings.theme : theme;

  const { p1, p2 } = settingsToUse;

  const { legOrSet, startingScore, opacity } = settingsToUse;

  const drawerValue = useRef(new Animated.Value(!drawer ? 1 : 0)).current;

  const [drawer, setDrawer] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // MODALS

  const [exitModal, setExitModal] = useState(false);
  const [finishLegModal, setFinishLegModal] = useState(false);
  const [finishMatchModal, setFinishMatchModal] = useState(false);
  const [rematchModal, setRematchModal] = useState(false);

  const toggleShowStats = useCallback(() => {
    setShowStats(!showStats);
  }, [showStats]);

  const navigation = useNavigation();
  const route = useRoute();

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

  useEffect(() => {
    if (isLegOver) {
      setFinishLegModal(true);
    } else if (finishLegModal) {
      setFinishLegModal(false);
    }
  }, [isLegOver, finishLegModal]);

  useEffect(() => {
    if (isMatchOver) {
      setFinishMatchModal(true);
    } else {
      setFinishMatchModal(false);
    }
  }, [route, isMatchOver]);

  useEffect(() => {
    if (isRematch) {
      setRematchModal(true);
    }
  }, [isRematch]);

  //MODAL ACTIONS

  const handleExitApp = () => {
    BackHandler.exitApp();
    setExitModal(!exitModal);
  };

  const animationValue = useRef(
    new Animated.Value(activePlayer === "p1" ? 0 : 1),
  ).current;

  useEffect(() => {
    if (animationToUse) {
      Animated.timing(drawerValue, {
        toValue: drawer ? 1 : 0,
        duration: 300,
      }).start();
      Animated.timing(animationValue, {
        toValue: activePlayer === "p1" ? 0 : 1,
        duration: 300,
      }).start();
    }
  }, [
    animationToUse,
    animationValue,
    activePlayer,
    preview,
    navigation,
    drawerValue,
    drawer,
  ]);

  const opacity1 = animationToUse
    ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.9],
      })
    : inactivePlayer === "p1"
    ? 0.9
    : 1;

  const opacity2 = animationToUse
    ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.9, 1],
      })
    : inactivePlayer === "p2"
    ? 0.9
    : 1;

  return (
    <GameWindow preview={preview}>
      <CLASSIC_TOP
        ingame={ingame}
        animation={animationToUse}
        theme={themeToUse}
        showStats={showStats}
        activePlayer={activePlayer}
        p1={p1}
        p2={p2}
        p1_DATA={p1_DATA}
        p2_DATA={p2_DATA}
        legOrSet={legOrSet}
      />
      <CLASSIC_SCORES
        ingame={ingame}
        animation={animationToUse}
        theme={themeToUse}
        showStats={showStats}
        activePlayer={activePlayer}
        startingScore={startingScore}
        p1Data={p1_DATA}
        p2Data={p2_DATA}
      />
      <CLASSIC_STATS
        ingame={ingame}
        animation={animationToUse}
        theme={themeToUse}
        showStats={showStats}
        activePlayer={activePlayer}
        p1_DATA={p1_DATA}
        p2_DATA={p2_DATA}
      />
      {opacity ? (
        inactivePlayer === "p1" ? (
          <Overlay1
            ingame={false}
            style={{ opacity: opacity1 }}
            theme={themeToUse}
          />
        ) : (
          <Overlay2
            ingame={ingame}
            style={{ opacity: opacity2 }}
            theme={themeToUse}
          />
        )
      ) : null}
      <InputContextProvider>
        <CLASSIC_MIDDLE
          p1={p1}
          p2={p2}
          ingame={false}
          animation={animationToUse}
          theme={themeToUse}
          activePlayer={activePlayer}
          inactivePlayer={inactivePlayer}
          drawer={drawer}
          toggleShowStats={toggleShowStats}
          setDrawer={() => setDrawer}
        />
        <CLASSIC_BOTTOM
          animation={animationToUse}
          theme={themeToUse}
          activePlayer={activePlayer}
          inactivePlayer={inactivePlayer}
          p1Data={p1_DATA}
          p2Data={p2_DATA}
          action={() => setFinishLegModal(true)}
        />
      </InputContextProvider>
      <EXIT_APP_ALERT
        animation={animationToUse}
        theme={themeToUse}
        action1={() => setExitModal(!exitModal)}
        action2={handleExitApp}
        visible={exitModal}
      />
      <FINISH_LEG_MODAL
        animation={animationToUse}
        theme={themeToUse}
        action={() => setFinishLegModal(!finishLegModal)}
        action2={() => setFinishMatchModal(true)}
        visible={finishLegModal}
      />
      <FINISH_MATCH_MODAL
        animation={animationToUse}
        theme={themeToUse}
        action={() => setFinishMatchModal(false)}
        action2={() => setRematchModal(true)}
        action3={() => setFinishMatchModal(true)}
        visible={finishMatchModal}
      />
      <REMATCH_MODAL
        animation={animationToUse}
        theme={themeToUse}
        action={() => setRematchModal(false)}
        visible={rematchModal}
      />
    </GameWindow>
  );
});

export default GAME_CLASSIC;
