import React, { useContext, useEffect, useRef } from "react";
import { Animated, TouchableHighlight } from "react-native";
import { GameContext } from "../../contexts/GameContext";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { AlignText, FlexRowAround } from "../../styles/css_mixins";
import { SettingsContext } from "../../contexts/SettingsContext";
import { useRoute } from "@react-navigation/native";

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

const NUM_BUTTON = React.memo(({ item }) => {
  const {
    dispatchGameData,
    gameData: {
      activePlayer,
      scoreInputArray: { whichDart },
    },
  } = useContext(GameContext);

  const {
    settings: { selectedTheme, animation },
  } = useContext(SettingsContext);

  const theme = selectedTheme;

  const animationValue = useRef(
    new Animated.Value(activePlayer === "p1" ? 1 : 0),
  ).current;

  const route = useRoute().name;

  const typeOfHandler = (item) => {
    switch (item) {
      case "OK":
        dispatchGameData({ type: "SUBMIT", value: "OK" });
        break;
      case "NEXT":
        dispatchGameData({ type: "NEXT_DART", value: whichDart + 1 });
        dispatchGameData({ type: "SUBMIT", value: "OK" });
        break;
      case "CLEAR":
        dispatchGameData({ type: "SUBMIT", value: "CLEAR" });
        break;
      case "BACK":
        dispatchGameData({ type: "SUBMIT", value: "BACK" });
        break;
      case "BUST":
        dispatchGameData({ type: "SUBMIT", value: "BUST" });
        break;
      default: {
        dispatchGameData({ type: "TYPE", value: item });
      }
    }
  };

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 300,
    }).start();
  }, [animationValue, activePlayer]);

  const borderColor = animation
    ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.game.p2Border, theme.game.p1Border],
      })
    : theme.game[activePlayer + "Border"];

  const backgroundColor = animation
    ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.game.p2Bg, theme.game.p1Bg],
      })
    : theme.game[activePlayer + "Bg"];

  const color = animation
    ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.game.p2Text, theme.game.p1Text],
      })
    : theme.game[activePlayer + "Text"];

  return (
    <Button_Num_Classic
      icon={"clear"}
      onPress={() => typeOfHandler(item)}
      disabled={route !== "game"}
    >
      <Text_Number
        style={{
          borderColor,
          backgroundColor:
            typeof item === "number"
              ? backgroundColor
              : theme.game.middle.bgMid,
          color: typeof item === "number" ? color : theme.text,
        }}
        type={typeof item}
        theme={theme}
        ap={activePlayer}
      >
        {item}
      </Text_Number>
    </Button_Num_Classic>
  );
});

export default NUM_BUTTON;
