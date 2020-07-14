import React, { useContext, useEffect, useRef } from "react";
import { Animated, Text, TouchableHighlight, View } from "react-native";
import { GameContext } from "../../../contexts/GameContext";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { AlignText, FlexCol, FlexRow } from "../../../styles/css_mixins";
import { SettingsContext } from "../../../contexts/SettingsContext";
import createAnimation from "../../../styles/playerSwitchTransition";

export const ClassicBottom = styled(View)`
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
  ${FlexCol};
`;

export const Text_Number = styled(Text)`
  ${AlignText};
  height: 100%;
  width: 100%;
  font-family: ${({ disabled, theme }) =>
    !disabled ? theme.fontFamilyBold : theme.fontFamily};
  font-size: ${({ type }) => (type === "number" ? 35 : 12.5)};
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
      case "BUTS":
        dispatchGameData({ type: "SUBMIT", value: "BUST" });
        break;
      default:
        dispatchGameData({ type: "TYPE", value: item });
    }
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 3000,
    }).start();
  }, [animation, activePlayer]);

  const AnimatedButton = Animated.createAnimatedComponent(Button_Num_Classic);
  const AnimatedText = Animated.createAnimatedComponent(Text_Number);

  const style1 = (item) => {
    const type = typeof item === "number";
    return createAnimation(theme, animation, type, type, true);
  };

  return (
    <ClassicBottom>
      {DATA.map((item) => {
        return (
          <AnimatedButton onPress={() => typeOfHandler(item)}>
            <AnimatedText
              style={style1(item)}
              type={typeof item}
              theme={theme}
              ap={activePlayer}
            >
              {item}
            </AnimatedText>
          </AnimatedButton>
        );
      })}
    </ClassicBottom>
  );
});

export default CLASSIC_BOTTOM;
