import React, { useEffect, useRef } from "react";
import { Animated, TouchableHighlight } from "react-native";
import styled from "styled-components/native";
import { BasicTextBold, FlexRowAround } from "../../styles/css_mixins";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconDart from "../../../assets/iconDart";

export const Button_Num_Classic = styled(TouchableHighlight)`
  width: ${() => 100 / 3 + "%"};
  height: ${({ bottom }) => (bottom ? "25%" : "50%")};
  ${FlexRowAround};
  border-width: ${({ theme }) => theme.borderWidth};
  padding: 0 3%;
  background-color: ${({ theme, value }) =>
    value === "NEXT" ? theme.bgGreen : theme.game.middle.bgMid};
`;

export const Text_Number = styled(Animated.Text)`
  ${BasicTextBold};
  height: 100%;
  width: ${({ icon }) => (icon ? "70%" : "100%")}
  font-size: ${({ theme }) => theme.fonts.fontSizeFunction};
  color: ${({ theme }) => theme.text}
`;

const FUNCTION_BUTTON = React.memo(
  ({ activePlayer, theme, animation, value, action, icon, bottom = false }) => {
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

    const AnimatedButton = Animated.createAnimatedComponent(Button_Num_Classic);

    return (
      <AnimatedButton
        bottom={bottom}
        value={value}
        onPress={action}
        disabled={route !== "game"}
        theme={theme}
        style={{
          borderColor,
        }}
      >
        <>
          {icon === "dart" ? (
            <IconDart fill={theme.text} size={theme.fonts.icon1} />
          ) : (
            <Icon name={icon} size={theme.fonts.icon1} color={theme.text} />
          )}
          <Text_Number
            icon={icon}
            style={{
              borderColor,
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

export default FUNCTION_BUTTON;
