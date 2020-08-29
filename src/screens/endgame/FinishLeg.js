import React, { useState, useContext } from "react";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import { BottomButtons2 } from "../stats/StyledStats";
import RADIO_BUTTON_SET from "../../components/buttons/RadioButtonSet";
import { CHECKOUTS } from "../../calc/scores";
import { GameContext } from "../../contexts/GameContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AppBackground } from "../../../App";
import { ScreenContainer } from "../../navigators/AppNavigator";
import STATS_PLAYERS from "../stats/StatsPlayers";
import { Header } from "../stats/StyledStats";

const FINISH_LEG = React.memo(({ navigation }) => {
  const {
    dispatchGameData,
    gameData,
    gameData: { settings, activePlayer, inactivePlayer, isLegOver, winner },
  } = useContext(GameContext);

  const { theme } = useContext(ThemeContext);

  const winnerName = winner ? gameData.settings[winner].key : "";
  const inapKey = `${inactivePlayer}_DATA`;
  const inapData = gameData[inapKey];

  const apKey = `${activePlayer}_DATA`;
  const apData = gameData[apKey];
  const apOnCheckout = apData.onCheckout;

  const nod = () => {
    if (isLegOver) {
      return CHECKOUTS.find((co) => co.value === inapData.lastScore)
        .checkouts[0].nod;
    }
    if (apOnCheckout) {
      return CHECKOUTS.find((co) => co.value === apData.score).checkouts[0].nod;
    }
    return null;
  };

  const OPTIONS = nod() === 3 ? [3] : nod() === 2 ? [2, 3] : [1, 2, 3];

  const [lastRoundNod, setLastRoundNod] = useState(nod() === 3 ? 3 : null);

  const handleLastDartNod = (val) => setLastRoundNod(val);

  const finishLeg = () => {
    if (lastRoundNod) {
      setLastRoundNod(null),
        dispatchGameData({
          type: "FINISH_LEG",
          nodUsed: lastRoundNod,
          nodRequired: parseInt(nod()),
          settings: settings,
        });
    }
  };

  const back = async () => {
    setLastRoundNod(null);
    await dispatchGameData({ type: "UNDO" });
    navigation.navigate("game");
  };

  return (
    <>
      <AppBackground
        source={require("../../../assets/bg.png")}
        resizeMode="cover"
      />
      <ScreenContainer theme={theme}>
        <Header>{winnerName} has won the leg!</Header>
        <STATS_PLAYERS theme={theme} gameData={gameData} />
        <Header>Number of darts used in last round:</Header>
        <RADIO_BUTTON_SET
          length={3}
          direction={"row"}
          options={OPTIONS}
          action={handleLastDartNod}
          activeValue={lastRoundNod}
        />
        <BottomButtons2 theme={theme}>
          <THEMED_BUTTON
            text={"undo"}
            length={2}
            size={"small"}
            type={"danger"}
            action={back}
          />
          <THEMED_BUTTON
            size={"small"}
            text={lastRoundNod ? "ok" : "select"}
            type={lastRoundNod ? "success" : "danger"}
            length={2}
            action={finishLeg}
          />
        </BottomButtons2>
      </ScreenContainer>
    </>
  );
});

export default FINISH_LEG;
