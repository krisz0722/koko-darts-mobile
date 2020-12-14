import React, { useContext, useEffect, useRef } from "react";
import { Animated } from "react-native";
import IconDart from "../../../../assets/iconDart";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { InputContext } from "../../../contexts/InputContext";
import { Container, Text_Function } from "./StyledInputByDartField";

const INPUT_BY_DART_FIELD = React.memo(({ activePlayer }) => {
  const {
    theme,
    themeContext: { animation },
  } = useContext(ThemeContext);

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
        {DATA.map((item, i) => (
          <React.Fragment key={i}>
            {item.showIcon ? (
              <IconDart fill={theme.text} size={theme.fonts.icon3} />
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
