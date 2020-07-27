import React, { useCallback, useContext } from "react";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { View } from "react-native";
import { FlexRow } from "../../../styles/css_mixins";
import PLAYER_INPUT_INFO from "./PlayerInputInfo";
import { useNavigation } from "@react-navigation/native";
import { GameContext } from "../../../contexts/GameContext";
import FUNCTION_BUTTON from "../../buttons/FunctionButton";
import { InputContext } from "../../../contexts/InputContext";

export const ClassicMiddle = styled(View)`
  ${FlexRow};
  position: absolute;
  flex-wrap: wrap;
  top: 45%;
  width: 100%;
  height: 18%;
`;

const CLASSIC_MIDDLE = React.memo((props) => {
  const {
    p1,
    p2,
    setDrawer,
    drawer,
    activePlayer,
    theme,
    animation,
    inactivePlayer,
    toggleShowStats,
  } = props;

  const {
    dispatchInput,
    inputContext: { whichDart, inputByDart, inputMethod },
  } = useContext(InputContext);

  const navigation = useNavigation();

  const { gameData, dispatchGameData } = useContext(GameContext);

  const toggleDrawer = useCallback(() => {
    navigation.toggleDrawer();
    setDrawer(!drawer);
  }, [setDrawer, navigation, drawer]);

  const submitBust = useCallback(() => {
    dispatchInput({ type: "SET_DEFAULT" });
    dispatchGameData({ type: "BUST" });
  }, [dispatchInput, dispatchGameData]);

  const changeInput = () => {
    const apKey = gameData.activePlayer + "_DATA";
    const apData = gameData[apKey];
    const apScore = apData.score;
    const { first, second } = inputByDart;

    const newScore = () => {
      switch (whichDart) {
        case 1:
          return apScore;
        case 2:
          return apScore + first;
        case 3:
          return apScore + first + second;
      }
    };
    dispatchGameData({
      type: "UPDATE_BY_DART",
      scoreToSubmit: 0,
      newScore: newScore(),
    });
    dispatchInput({ type: "CHANGE_INPUT" });
  };

  const BUTTONS_MIDDLE = [
    {
      value: "MENU",
      action: () => toggleDrawer(),
      icon: "menu",
    },
    {
      value: "SHOW STATS",
      action: toggleShowStats,
      icon: "show-chart",
    },
    {
      value: "BUST",
      action: () => submitBust(),
      icon: "not-interested",
    },
    {
      value: p1.key,
      action: null,
      icon: null,
    },
    {
      value: inputMethod === "byRound" ? "INPUT BY DART" : "INPUT BY ROUND",
      action: () => changeInput(),
      icon: inputMethod === "byRound" ? "dart" : "donut-large",
    },
    {
      value: p2.key,
      action: null,
      icon: null,
    },
  ];

  return (
    <ClassicMiddle>
      {BUTTONS_MIDDLE.map((item) => {
        return (
          <React.Fragment key={item.value}>
            {item.action === null ? (
              <PLAYER_INPUT_INFO
                animation={animation}
                theme={theme}
                activePlayer={activePlayer}
                inactivePlayer={inactivePlayer}
                value={item.value}
                player={item.value}
              />
            ) : (
              <FUNCTION_BUTTON
                value={item.value}
                action={item.action}
                icon={item.icon}
                animation={animation}
                theme={theme}
                activePlayer={activePlayer}
                inactivePlayer={inactivePlayer}
              />
            )}
          </React.Fragment>
        );
      })}
    </ClassicMiddle>
  );
});

export default CLASSIC_MIDDLE;
