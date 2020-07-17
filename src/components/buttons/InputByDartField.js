import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { Animated, Text, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SettingsContext } from "../../contexts/SettingsContext";
import { GameContext } from "../../contexts/GameContext";
import {
  BasicTextBold,
  FlexRow,
  FlexCol,
  FlexRowAround,
} from "../../styles/css_mixins";
import IconDart from "../../../assets/iconDart";
import IconThreeDart from "../../../assets/iconThreeDart";

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
  ${FlexRowAround};
`;

export const Text_Function = styled(Text)`
  ${BasicTextBold};
  font-size: ${({ theme }) => theme.game.buttonFontSize.function};
  color: ${({ theme }) => theme.text};
`;

const INPUT_BY_DART_FIELD = () => {
  const {
    settings: { selectedTheme, animation },
  } = useContext(SettingsContext);

  const theme = selectedTheme;
  const {
    gameData: {
      activePlayer,
      scoreInputArray: { inputByDart },
    },
  } = useContext(GameContext);

  const animationValue = useRef(
    new Animated.Value(activePlayer === "p1" ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 300,
    }).start();
  }, [animationValue, activePlayer]);

  const AnimatedView = Animated.createAnimatedComponent(View_Function);
  const AnimatedText = Animated.createAnimatedComponent(Text_Function);

  const borderColor = animation
    ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.game.p2Border, theme.game.p1Border],
      })
    : theme.game[activePlayer + "Border"];

  console.log("inputByDart", inputByDart);
  console.log("first", inputByDart["1"]);

  const DATA = [
    {
      key: 1,
      showIcon: inputByDart["1"].length === 0,
      value: inputByDart["1"],
    },
    {
      key: 2,
      showIcon: inputByDart["2"].length === 0,
      value: inputByDart["2"],
    },
    {
      key: 3,
      showIcon: inputByDart["3"].length === 0,
      value: inputByDart["3"],
    },
  ];

  return (
    <AnimatedView ap={activePlayer} style={{ borderColor }}>
      <>
        {DATA.map((item) => (
          <>
            {item.showIcon ? (
              <IconDart fill={selectedTheme.text} size={15} />
            ) : (
              <Text_Function icon={true}>{item.value}</Text_Function>
            )}
            {item.key < 3 ? <Text_Function icon={true}>+</Text_Function> : null}
          </>
        ))}
      </>
    </AnimatedView>
  );
};

export default INPUT_BY_DART_FIELD;
