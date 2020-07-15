import React, { useContext, useEffect, useRef } from "react";
import { Animated, Text, TouchableHighlight, View } from "react-native";
import { GameContext } from "../../../contexts/GameContext";
import styled from "styled-components/native/dist/styled-components.native.esm";
import {
  AlignText,
  FlexCol,
  FlexRow,
  FlexRowAround,
} from "../../../styles/css_mixins";
import { SettingsContext } from "../../../contexts/SettingsContext";
import createAnimation from "../../../styles/playerSwitchTransition";

export const ClassicBottom = styled(Animated.View)`
  ${FlexRow};
  flex-wrap: wrap;
  position: absolute;
  top: 63%;
  width: 100%;
  height: 37%;
`;

export const Button_Num_Classic = styled(TouchableHighlight)`
  text-decoration: none;
  width: ${() => 100 / 3 + "%"};
  height: 25%;
  ${FlexRowAround};
`;

export const Text_Number = styled(Animated.Text)`
  ${AlignText};
  height: 100%;
  width: 100%;
  font-family: ${({ disabled, theme }) =>
    !disabled ? theme.fontFamilyBold : theme.fontFamily};
  font-size: ${({ type, theme }) =>
    type === "number"
      ? theme.game.buttonFontSize.num
      : theme.game.buttonFontSize.function};
  background-color: ${({ theme }) => theme.game.middle.bgMid};
  color: ${({ theme }) => theme.text};
  border-width: ${({ theme }) => theme.borderWidth};
`;

const CLASSIC_BOTTOM = React.memo(() => {
  const {
    dispatchGameData,
    gameData: {
      activePlayer,
      scoreInputArray: { manualInput, defaultInput },
    },
  } = useContext(GameContext);

  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const theme = selectedTheme;

  const buttonText =
    defaultInput[0] === "" && manualInput[0] === "" ? "BACK" : "CLEAR";

  const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, buttonText, 0, "OK"];

  const animation = useRef(new Animated.Value(activePlayer === "p1" ? 1 : 0))
    .current;

  const typeOfHandler = (item) => {
    switch (item) {
      case "OK":
        dispatchGameData({ type: "SUBMIT", value: "OK" });
        break;
      case "CLEAR":
        dispatchGameData({ type: "SUBMIT", value: "CLEAR" });
        break;
      case "BUST":
        dispatchGameData({ type: "SUBMIT", value: "BUST" });
        break;
      default:
        dispatchGameData({ type: "TYPE", value: item });
    }
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 300,
    }).start();
  }, [animation, activePlayer]);

  const style1 = (item) => {
    const type = typeof item === "number";
    return createAnimation(theme, animation, type, type, true);
  };

  return (
    <ClassicBottom>
      {DATA.map((item) => {
        return (
          <Button_Num_Classic
            icon={"clear"}
            onPress={() => typeOfHandler(item)}
          >
            <Text_Number
              style={style1(item)}
              type={typeof item}
              theme={theme}
              ap={activePlayer}
            >
              {item}
            </Text_Number>
          </Button_Num_Classic>
        );
      })}
    </ClassicBottom>
  );
});

export default CLASSIC_BOTTOM;
