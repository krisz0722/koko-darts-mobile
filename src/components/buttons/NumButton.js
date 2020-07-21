import React, { useContext, useEffect, useRef } from "react";
import { Animated, TouchableHighlight } from "react-native";
import { GameContext } from "../../contexts/GameContext";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { BasicTextBold, FlexRowAround } from "../../styles/css_mixins";
import { SettingsContext } from "../../contexts/SettingsContext";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconDart from "../../../assets/iconDart";
import { ThemeContext } from "../../contexts/ThemeContext";

export const Button_Num_Classic = styled(TouchableHighlight)`
  width: ${() => 100 / 3 + "%"};
  height: ${({ middle }) => (middle ? "50%" : "25%")};
  ${FlexRowAround};
  border-width: ${({ theme }) => theme.borderWidth};
  padding: 0 3%;
  background-color: ${({ theme, value }) =>
    value === "NEXT" ? theme.bgGreen : "transparent"};
`;

export const Text_Number = styled(Animated.Text)`
  ${BasicTextBold};
  height: 100%;
  width: ${({ icon }) => (icon ? "70%" : "100%")}
  font-size: ${({ type, theme }) =>
    type === "num"
      ? theme.game.buttonFontSize.num
      : theme.game.buttonFontSize.function};
`;

const NUM_BUTTON = React.memo(
  ({ type, value, action, icon, middle = false }) => {
    const {
      dispatchGameData,
      gameData: { activePlayer },
    } = useContext(GameContext);

    const { theme, animation } = useContext(ThemeContext);

    const animationValue = useRef(
      new Animated.Value(activePlayer === "p1" ? 1 : 0),
    ).current;

    const route = useRoute().name;

    const typeOfHandler = (type, action, value) => {
      switch (type) {
        case "num":
          dispatchGameData({ type: "TYPE", value });
          break;
        case "dispatch":
          dispatchGameData({ type: action, value });
          break;
        case "function":
          return action();
        case "info":
          return null;
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

    const animatedBg = animation
      ? animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [theme.game.p2Bg, theme.game.p1Bg],
        })
      : theme.game[activePlayer + "Bg"];

    const animatedColor = animation
      ? animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [theme.game.p2Text, theme.game.p1Text],
        })
      : theme.game[activePlayer + "Text"];

    const backgroundColor =
      value === "NEXT"
        ? theme.bgGreen
        : type === "num"
        ? animatedBg
        : value === "next"
        ? theme.bgGreen
        : theme.game.middle.bgMid;

    const color = type === "num" ? animatedColor : theme.text;

    const AnimatedButton = Animated.createAnimatedComponent(Button_Num_Classic);

    return (
      <AnimatedButton
        value={value}
        middle={middle}
        onPress={() => typeOfHandler(type, action, value)}
        disabled={route !== "game"}
        theme={theme}
        style={{
          borderColor,
          backgroundColor,
          color,
        }}
      >
        <>
          {icon ? (
            icon === "dart" ? (
              <IconDart fill={theme.text} size={15} />
            ) : (
              <Icon name={icon} size={25} color={theme.text} />
            )
          ) : null}
          <Text_Number
            icon={icon}
            style={{
              borderColor,
              color: type === "num" ? color : theme.text,
            }}
            type={type}
            theme={theme}
            ap={activePlayer}
          >
            {value}
          </Text_Number>
        </>
      </AnimatedButton>
    );
  },
);

export default NUM_BUTTON;
