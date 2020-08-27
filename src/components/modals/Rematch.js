import React, { useState, useContext } from "react";
import THEMED_BUTTON from "../buttons/ThemedButton";
import { BottomButtons } from "./StyledModal";
import { Header2, Header3, ModalContainerAlert } from "./StyledModal";
import RADIO_BUTTON_SET from "../buttons/RadioButtonSet";
import { GameContext } from "../../contexts/GameContext";
import { Authcontext } from "../../contexts/AuthContext";
import moment from "moment";
import updateAuthMatchesRematch from "../../contexts/actions/authContext/UpdateMatchesRematch";
import { updateStatus } from "../../_backend/db/crudUpdate";
import { ThemeContext } from "../../contexts/ThemeContext";

const REMATCH_MODAL = React.memo(({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  const {
    dispatchGameData,
    gameData: {
      settings,
      opponent,
      settings: { startingScore, p1, p2 },
    },
  } = useContext(GameContext);

  const {
    userData: { username },
  } = useContext(Authcontext);

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
      await updateStatus(
        activePlayer.key,
        inactivePlayer.key,
        false,
        navigation,
        "leave",
      );
    } else {
      await updateStatus(p1.key, p2.key, false, navigation, "leave");
    }
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

      await updateAuthMatchesRematch(rematch, navigation, "rematch");
    }
    return null;
  };

  return (
    <ModalContainerAlert theme={theme}>
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
          text={"back to home"}
          length={2}
          size={"small"}
          type={"danger"}
          action={quitGame}
          inGameTheme={theme}
        />
        <THEMED_BUTTON
          size={"small"}
          text={activePlayer ? "game on!" : "select"}
          type={"success"}
          length={2}
          disabled={activePlayer ? false : true}
          action={rematch}
          inGameTheme={theme}
        />
      </BottomButtons>
    </ModalContainerAlert>
  );
});

export default REMATCH_MODAL;
