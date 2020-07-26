import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { Animated } from "react-native";
import { GameContext } from "../../../contexts/GameContext";
import { BasicTextBold, FlexRowAround } from "../../../styles/css_mixins";
import IconDart from "../../../../assets/iconDart";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { InputContext } from "../../../contexts/InputContext";

export const Container = styled(Animated.View)`
  ${FlexRowAround}
  width: ${() => 100 / 3 + "%"};
  padding:2%;
  height:50%;  
  background-color: ${({ theme }) => theme.bgGreen};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
  border-width: ${({ theme }) => theme.borderWidth};
`;
export const Text_Function = styled(Animated.Text)`
  ${BasicTextBold};
  font-size: ${({ theme }) => theme.game.buttonFontSize.function};
  color: ${({ theme }) => theme.text};
`;

const INPUT_BY_DART_FIELD = React.memo(({ activePlayer }) => {
  const { theme, animation } = useContext(ThemeContext);

  const {
    inputContext: { whichDart, inputArray, inputByDart },
  } = useContext(InputContext);

  const animationValue = useRef(
    new Animated.Value(activePlayer === "p1" ? 1 : 0),
  ).current;

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

  const first =
    whichDart === 1 ? inputArray.slice(0, 2).join("") : inputByDart.first;
  const second =
    whichDart <= 2 ? inputArray.slice(2, 4).join("") : inputByDart.second;
  const third =
    whichDart <= 3 ? inputArray.slice(4, 6).join("") : inputByDart.third;

  const DATA = [
    {
      key: 1,
      showIcon: first === "",
      value: first,
    },
    {
      key: 2,
      showIcon: second === "",
      value: second,
    },
    {
      key: 3,
      showIcon: third === "",
      value: third,
    },
  ];

  return (
    <Container ap={activePlayer} style={{ borderColor }}>
      <>
        {DATA.map((item) => (
          <React.Fragment key={item.key}>
            {item.showIcon ? (
              <IconDart fill={theme.text} size={15} />
            ) : (
              <Text_Function icon={true}>{item.value}</Text_Function>
            )}
            {item.key < 3 ? <Text_Function icon={true}>+</Text_Function> : null}
          </React.Fragment>
        ))}
      </>
    </Container>
  );
});

export default INPUT_BY_DART_FIELD;
