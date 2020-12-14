import React, { useState, useContext } from "react";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import { CHECKOUTS } from "../../utils/calc/scores";
import { GameContext } from "../../contexts/GameContext";
import { AppBackground } from "../../../App";
import { ScreenContainer } from "../../navigators/StyledNav";
import {
  OptionButton,
  OptionText,
  Header,
  BottomButtons2,
  Players,
} from "./StyledEndGame";
import PLAYER from "../../components/players/Player";

const FINISH_LEG = React.memo(({ navigation }) => {
  const {
    dispatchGameData,
    gameData,
    gameData: {
      settings: { theme },
      settings,
      activePlayer,
      inactivePlayer,
      isLegOver,
      winner,
    },
  } = useContext(GameContext);

  const winnerPlayer = winner
    ? gameData.settings[winner]
    : { key: "", img: "" };
  const winnerName = winnerPlayer.key;

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

  const finishLeg = async () => {
    if (lastRoundNod) {
      setLastRoundNod(null);
      await dispatchGameData({
        type: "FINISH_LEG",
        nodUsed: lastRoundNod,
        nodRequired: parseInt(nod()),
        settings: settings,
      });
      navigation.navigate("game");
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
        <Header theme={theme}>{winnerName} has won the leg!</Header>
        <Players theme={theme}>
          <PLAYER name={false} large={true} player={winnerPlayer} />
        </Players>

        <Header theme={theme}>Number of darts used in last round:</Header>
        <BottomButtons2 border={"none"} theme={theme}>
          {OPTIONS.map((item, i) => (
            <OptionButton
              key={i}
              size={"large"}
              onPress={() => handleLastDartNod(item)}
              length={3}
              theme={theme}
              active={item === lastRoundNod}
            >
              <OptionText active={item === lastRoundNod} theme={theme}>
                {item}
              </OptionText>
            </OptionButton>
          ))}
        </BottomButtons2>
        <BottomButtons2 theme={theme}>
          <THEMED_BUTTON
            text={"undo"}
            length={2}
            size={"small"}
            type={"danger"}
            action={back}
            inGameTheme={theme}
          />
          <THEMED_BUTTON
            size={"small"}
            text={lastRoundNod ? "ok" : "select"}
            type={lastRoundNod ? "success" : "danger"}
            length={2}
            action={finishLeg}
            inGameTheme={theme}
          />
        </BottomButtons2>
      </ScreenContainer>
    </>
  );
});

export default FINISH_LEG;
