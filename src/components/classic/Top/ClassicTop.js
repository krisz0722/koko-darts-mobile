import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import AVATAR from "./ClassicAvatar";
import LEGSET from "./ClassicLegSet";
import NAME from "./ClassicName";
import {
  ClassicTop,
  PlayerInfo1,
  PlayerInfo2,
  PlayerInfoRow,
} from "./StyledClassicTop";

const CLASSIC_TOP = React.memo((props) => {
  const {
    p1,
    p2,
    legOrSet,
    p1_DATA,
    p2_DATA,
    activePlayer,
    showStats,
    animation,
    theme,
  } = props;

  const animationValue = useRef(
    new Animated.Value(activePlayer === "p1" ? 1 : 0),
  ).current;
  const resize = useRef(new Animated.Value(showStats ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: activePlayer === "p1" ? 1 : 0,
      duration: 300,
    }).start();
  }, [animationValue, activePlayer]);

  useEffect(() => {
    Animated.timing(resize, {
      toValue: showStats ? 1 : 0,
      duration: 300,
    }).start();
  }, [resize, showStats]);

  const height = animation
    ? resize.interpolate({
        inputRange: [0, 1],
        outputRange: ["15%", "10%"],
      })
    : showStats
    ? "10%"
    : "15%";

  const borderColor = animation
    ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.game.p2Border, theme.game.p1Border],
      })
    : theme.game[activePlayer + "Border"];

  return (
    <ClassicTop style={{ height }} showStats={showStats}>
      <PlayerInfo1 theme={theme}>
        <PlayerInfoRow style={{ borderColor }} ap={activePlayer} theme={theme}>
          <AVATAR
            activePlayer={activePlayer}
            showStats={showStats}
            player={"p1"}
            img={p1.img}
            animation={animation}
            theme={theme}
          />
          <LEGSET
            activePlayer={activePlayer}
            showStats={showStats}
            player={"p1"}
            legsWon={p1_DATA.legsWon}
            setsWon={p1_DATA.setsWon}
            animation={animation}
            theme={theme}
            legOrSet={legOrSet}
          />
        </PlayerInfoRow>
        <NAME
          showStats={showStats}
          animation={animation}
          theme={theme}
          activePlayer={activePlayer}
          name={p1.key}
          player={"p1"}
        />
      </PlayerInfo1>
      <PlayerInfo2 theme={theme}>
        <PlayerInfoRow style={{ borderColor }} ap={activePlayer} theme={theme}>
          <AVATAR
            animation={animation}
            theme={theme}
            activePlayer={activePlayer}
            showStats={showStats}
            player={"p2"}
            img={p2.img}
          />
          <LEGSET
            animation={animation}
            theme={theme}
            legsWon={p2_DATA.legsWon}
            setsWon={p2_DATA.setsWon}
            activePlayer={activePlayer}
            showStats={showStats}
            player={"p2"}
            legOrSet={legOrSet}
          />
        </PlayerInfoRow>
        <NAME
          animation={animation}
          theme={theme}
          activePlayer={activePlayer}
          showStats={showStats}
          name={p2.key}
          player={"p2"}
        />
      </PlayerInfo2>
    </ClassicTop>
  );
});

export default CLASSIC_TOP;
