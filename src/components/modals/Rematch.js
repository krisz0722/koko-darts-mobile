import React, { useEffect, useState, useContext, useMemo } from "react";
import { Text, Modal } from "react-native";
import THEMED_BUTTON from "../buttons/ThemedButton";
import { BottomButtons } from "./StyledModal";
import { Header2, Header3, ModalContainerAlert } from "./StyledModal";
import RADIO_BUTTON_SET from "../buttons/RadioButtonSet";
import { GameContext } from "../../contexts/GameContext";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Authcontext } from "../../contexts/AuthContext";
import moment from "moment";
import Theme_Default from "../../styles/theme-default.json";
import Theme_Contrast from "../../styles/theme-contrast.json";
import updateAuthMatchesRematch from "../../contexts/actions/authContext/UpdateMatchesRematch";
import { updateStatus } from "../../fb/crud";

const TIMER = ({ quitGame }) => {
  const navigation = useNavigation();
  const [count, setCount] = useState(10);
  const timer = () => setCount(count - 1);

  useEffect(() => {
    if (count <= 0) {
      (async () => {
        await quitGame();
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "homenavigator" }],
          }),
        );
      })();
    }
    const id = setInterval(() => timer(), 1000);
    return () => clearInterval(id);
  }, [count]);

  return <Text>{count}</Text>;
};

const REMATCH_MODAL = React.memo(({ animation, theme, action, visible }) => {
  const THEMES = useMemo(
    () => ({
      default: Theme_Default,
      contrast: Theme_Contrast,
    }),
    [],
  );

  const navigation = useNavigation();

  const {
    dispatchGameData,
    gameData,
    gameData: {
      settings,
      opponent,
      settings: { startingScore, p1, p2 },
    },
  } = useContext(GameContext);

  const {
    userData: { username },
  } = useContext(Authcontext);

  const animationType = animation
    ? theme.name === "default"
      ? "fade"
      : "slide"
    : "none";

  const [activePlayer, setActivePlayer] = useState(null);
  const [inactivePlayer, setInactivePlayer] = useState(null);

  const handlePLayerToStart = (val) => {
    const active = val === p1.key ? p1 : p2;
    const inactive = active === p1 ? p2 : p1;
    setActivePlayer(active);
    setInactivePlayer(inactive);
  };

  const activePlayerName = activePlayer ? activePlayer.key : "";

  const OPTIONS = [p1.key, p2.key];

  const quitGame = async () => {
    await dispatchGameData({ type: "LOAD_SETTINGS" });
    if (activePlayer) {
      await updateStatus(activePlayer.key, inactivePlayer.key, false);
    } else {
      await updateStatus(p1.key, p2.key, false);
    }

    action();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "homenavigator" }],
      }),
    );
  };

  const rematch = async () => {
    if (activePlayer) {
      const date = moment().format("MM-DD-YYYY");
      const date2 = moment().format("MMMM Do YYYY, h:mm:ss a");
      const key = `${p1.key} vs ${p2.key} - ${date2}`;
      const rematch = {
        username,
        activePlayer,
        inactivePlayer,
        startingScore,
        settings,
        opponent,
        date,
        key,
      };

      await dispatchGameData({
        type: "REMATCH",
        value: rematch,
      });

      await updateAuthMatchesRematch(rematch, THEMES);

      action();
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "game" }],
        }),
      );
    }
    return null;
  };

  return (
    <Modal
      animationType={animationType}
      transparent={true}
      presentationStyle={"pageSheet"}
      visible={visible}
    >
      <ModalContainerAlert theme={theme}>
        {visible ? <TIMER quitGame={quitGame} /> : null}
        <Header2>throw for the start!</Header2>
        <Header3>selec the player to start the next match</Header3>
        <RADIO_BUTTON_SET
          length={2}
          direction={"row"}
          options={OPTIONS}
          action={handlePLayerToStart}
          activeValue={activePlayerName}
        />
        <BottomButtons theme={theme}>
          <THEMED_BUTTON
            text={"quit game"}
            length={2}
            size={"small"}
            icon={"arrow-back"}
            type={"danger"}
            action={quitGame}
            inGameTheme={theme}
          />
          <THEMED_BUTTON
            size={"small"}
            text={activePlayer ? "game on!" : "select"}
            type={"success"}
            length={2}
            icon={activePlayer ? "check" : "person"}
            action={rematch}
            inGameTheme={theme}
          />
        </BottomButtons>
      </ModalContainerAlert>
    </Modal>
  );
});

export default REMATCH_MODAL;
