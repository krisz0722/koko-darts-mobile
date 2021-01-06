import React, {
  useMemo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import moment from "moment";
import { BackHandler } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { GameContext } from "../../../contexts/GameContext";
import { Authcontext } from "../../../contexts/AuthContext";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { SettingsPreGameBottomButtons } from "./StyledPreGame";
import updateAuthMatchesAdd from "../../../contexts/actions/authContext/UpdateMatchesAdd";
import Theme_Default from "../../../styles/theme-default.js";
import Theme_Contrast from "../../../styles/theme-contrast.js";
import OPTIONS_SCORE from "../OptionsScore";
import OPTIONS_LEGORSET from "../OptionsLegOrSet";
import HISTORY from "./History";
import PLAYERS from "./Players";
import THEMED_BUTTON from "../../../components/buttons/ThemedButton";
import CHOOSE_PLAYER_MODAL from "../../../components/modals/ChoosePlayerModal";
import fetchPost from "../../../utils/fetchPost";

const PREGAME_SETTINGS = React.memo(({ navigation }) => {
  const {
    theme,
    themeContext: { animation },
  } = useContext(ThemeContext);
  const { dispatchGameData } = useContext(GameContext);
  const isFocused = useIsFocused();

  const {
    settings,
    dispatchSettings,
    settings: { p1, p2, legOrSet, toWin, legsPerSet, startingScore },
  } = useContext(SettingsContext);

  const {
    dispatchUserData,
    userData: { username, id, unfinishedMatches, friends },
  } = useContext(Authcontext);

  const [stateLegOrSet, setLegOrSet] = useState(legOrSet);
  const [stateStartingScore, setStartingScore] = useState(startingScore);
  const [stateToWin, setTowin] = useState(toWin);
  const [stateLegsPerSet, setLegsPerSet] = useState(legsPerSet);
  const [stateP1, setP1] = useState(p1);
  const [stateP2, setP2] = useState(p2);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const isEmpty = p2.key === "";
    const hasUnfinished = unfinishedMatches.find((item) => {
      return item.opponent.id === p2.id;
    });
    if ((isEmpty || hasUnfinished) && isFocused) {
      setModal(true);
      setP2({ key: "", img: "" });
    }
  }, [unfinishedMatches, p2.id, p2.key, isFocused]);

  const THEMES = useMemo(
    () => ({
      default: Theme_Default,
      contrast: Theme_Contrast,
    }),
    [],
  );

  const newGameSettings = useMemo(
    () => ({
      ...settings,
      p1: stateP1,
      p2: stateP2,
      legOrSet: stateLegOrSet,
      startingScore: stateStartingScore,
      toWin: stateToWin,
      legsPerSet: stateLegsPerSet,
    }),
    [
      settings,
      stateP1,
      stateP2,
      stateLegOrSet,
      stateStartingScore,
      stateToWin,
      stateLegsPerSet,
    ],
  );

  useEffect(() => {
    if (isFocused) {
      setLegOrSet(legOrSet);
      setStartingScore(startingScore);
      setTowin(toWin);
      setLegsPerSet(legsPerSet);
    } else {
      dispatchSettings({
        type: "CHOOSE_OPPONENT",
        value: p2,
      });
    }
  }, [
    legOrSet,
    legsPerSet,
    toWin,
    startingScore,
    p2,
    dispatchSettings,
    isFocused,
  ]);

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

  const startGame = useCallback(async () => {
    const date = moment().format("MM-DD-YYYY");
    const date2 = moment().format("MMMM Do YYYY, h:mm:ss a");
    const key = `${p1.key} vs ${p2.key} - ${date2}`;
    const newMatch = {
      username,
      settings: newGameSettings,
      date,
      key,
      id,
    };
    await dispatchGameData({
      type: "START_NEW_GAME",
      value: newMatch,
    });
    const updatedUserData = await updateAuthMatchesAdd(
      newMatch,
      THEMES,
      navigation,
      "new",
      id,
    ).then((data) => data);
    dispatchUserData({ type: "UPDATE_PROFILE", value: updatedUserData });
  }, [
    id,
    dispatchUserData,
    p1.key,
    p2.key,
    THEMES,
    username,
    newGameSettings,
    navigation,
    dispatchGameData,
  ]);

  const changeOpponent = (back = false) => {
    if (back) {
      navigation.goBack();
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const chooseGuest = () => {
    const guest = friends.find((item) => item.key === "GUEST");
    setModal(false);
    if (stateP2 === p1) {
      setP1(guest);
    } else {
      setP2(guest);
    }
  };

  const chooseProfile = async (val) => {
    const opponentData = await fetchPost("api/getuserdata", {
      uid: val.id,
    }).then((data) => {
      return data;
    });

    const isInGame = opponentData.inGame;
    if (!isInGame) {
      if (stateP2 === p1) {
        setP1(val);
      } else {
        setP2(val);
      }
    } else {
      alert("IS IN GAME");
    }
  };

  const handleModal = () => {
    if (p2 !== "" && p2) {
      setModal(false);
    }
  };

  return (
    <>
      <PLAYERS
        theme={theme}
        toggleSwap={toggleSwap}
        p1={stateP1}
        p2={stateP2}
      />
      <OPTIONS_SCORE
        startingScore={stateStartingScore}
        toggleStartingScore={toggleStartingScore}
        page={"pregame"}
        theme={theme}
      />
      <OPTIONS_LEGORSET
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
      <HISTORY p1={stateP1} p2={stateP2} theme={theme} />
      <SettingsPreGameBottomButtons theme={theme}>
        <THEMED_BUTTON
          text={"back"}
          length={3}
          size={"small"}
          type={"danger"}
          action={() => navigation.navigate("home")}
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
          action={startGame}
        />
      </SettingsPreGameBottomButtons>
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
});

export default PREGAME_SETTINGS;
