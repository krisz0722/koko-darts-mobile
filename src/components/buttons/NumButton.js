import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacity } from "react-native";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { BasicTextBold, FlexCol, FlexRowAround } from "../../styles/css_mixins";
import { useRoute } from "@react-navigation/native";

export const Button_Num_Classic = styled(TouchableOpacity)`
  width: ${() => 100 / 3 + "%"};
  height: 25%;
  ${FlexRowAround};
  border-width: ${({ theme }) => theme.borderWidth};
  padding: 0 3%;
`;

export const Text_Number = styled(Animated.Text)`
  ${BasicTextBold};
  font-size: ${({ theme }) => theme.fontSizeNum};
  ${FlexCol};
`;

const NUM_BUTTON = React.memo(
  ({ activePlayer, theme, typeMethod, animation, value }) => {
    const animationValue = useRef(
      new Animated.Value(activePlayer === "p1" ? 1 : 0),
    ).current;

    const route = useRoute().name;

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

    const AnimatedButton = Animated.createAnimatedComponent(Button_Num_Classic);

    return (
      <AnimatedButton
        value={value}
        onPress={() => typeMethod(value)}
        disabled={route !== "game"}
        theme={theme}
        style={{
          borderColor,
          backgroundColor: animatedBg,
        }}
      >
        <>
          <Text_Number
            style={{
              borderColor,
              color: animatedColor,
            }}
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
