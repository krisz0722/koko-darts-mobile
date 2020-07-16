import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { Animated, Text, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SettingsContext } from "../../contexts/SettingsContext";
import { GameContext } from "../../contexts/GameContext";
import { BasicTextBold, FlexCol, FlexRowAround } from "../../styles/css_mixins";
import createAnimation from "../../styles/playerSwitchTransition";
import { useRoute } from "@react-navigation/native";

export const Button_Function_Classic = styled(TouchableHighlight)`
  ${FlexRowAround}
  width: ${() => 100 / 3 + "%"};
  padding: ${({ icon }) => (icon ? "2%" : 0)};
  height:50%;  
  background-color: ${({ theme }) => theme.game.middle.bgMid};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
  border-width: ${({ theme }) => theme.borderWidth};
`;
export const View_Function = styled(Button_Function_Classic)`
  ${FlexCol};
`;

export const Text_Function = styled(Text)`
  ${BasicTextBold};
  height: ${({ icon }) => (icon ? "100%" : "50%")};
  width: ${({ icon }) => (icon ? "75%" : "100%")};
  font-size: ${({ theme }) => theme.game.buttonFontSize.function};
  color: ${({ theme }) => theme.text};
`;

const CLASSIC_FUNCTION = ({ disabled, value, name, action = null, icon }) => {
  const {
    settings: { selectedTheme, animation },
  } = useContext(SettingsContext);

  const theme = selectedTheme;
  const {
    dispatchGameData,
    gameData,
    gameData: {
      activePlayer,
      inactivePlayer,
      scoreInputArray: { defaultInput },
    },
  } = useContext(GameContext);

  const route = useRoute().name;

  const handleOnPress = (value, action) => {
    if (route === "game") {
      if (action) {
        dispatchGameData({ type: action, value });
      } else {
        dispatchGameData({ type: "SUBMIT", value });
      }
    } else {
      return null;
    }
  };

  const animationValue = useRef(
    new Animated.Value(activePlayer === "p1" ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 300,
    }).start();
  }, [animationValue, activePlayer]);

  const AnimatedButton = Animated.createAnimatedComponent(
    Button_Function_Classic,
  );
  const AnimatedView = Animated.createAnimatedComponent(View_Function);
  const AnimatedText = Animated.createAnimatedComponent(Text_Function);

  const borderColor = animation
    ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.game.p2Border, theme.game.p1Border],
      })
    : theme.game[activePlayer + "Border"];

  const scoreDisplayText =
    name === activePlayer
      ? "current:" + defaultInput.join("")
      : "last:" + gameData[inactivePlayer + "_DATA"].lastScore;

  return (
    <>
      {name === "p2" || name === "p1" ? (
        <AnimatedView
          ap={activePlayer}
          style={{ borderColor }}
          disabled={disabled}
          name={name}
        >
          <>
            <AnimatedText theme={selectedTheme} icon={icon}>
              {value}
            </AnimatedText>
            <AnimatedText theme={selectedTheme} icon={icon}>
              {scoreDisplayText}
            </AnimatedText>
          </>
        </AnimatedView>
      ) : (
        <AnimatedButton
          ap={activePlayer}
          style={{ borderColor }}
          onPress={() => handleOnPress(value, action)}
          disabled={route !== "game"}
          name={name}
          icon={icon}
        >
          <>
            {icon ? (
              <Icon
                style={{ marginHorizontal: "2%" }}
                name={icon}
                size={25}
                color={theme.text}
              />
            ) : null}
            <AnimatedText theme={selectedTheme} icon={icon}>
              {value}
            </AnimatedText>
          </>
        </AnimatedButton>
      )}
    </>
  );
};

export default CLASSIC_FUNCTION;

//TODO Icon.Button component!
