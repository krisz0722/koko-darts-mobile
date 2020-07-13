import React, { useContext, useRef } from "react";
import { GameContext } from "../../../contexts/GameContext";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { Animated, View } from "react-native";
import { Absolute, FlexColStart } from "../../../styles/css_mixins";
import PLAYER_INFO from "./ClassicPlayerInfo";

export const ClassicTop = styled(View)`
  ${FlexColStart};
  ${Absolute};
  width: 100%;
  height: ${({ showStats }) => (showStats ? "10%" : "15%")};
`;

const CLASSIC_TOP = () => {
  const {
    gameData: { showStats },
  } = useContext(GameContext);

  const animation = useRef(new Animated.Value(0)).current;

  // const top = animation.interpolate({
  //   inputRange:[0,1],
  //   outputRange
  // })

  return (
    <ClassicTop showStats={showStats}>
      <PLAYER_INFO player={"p1"} />
      <PLAYER_INFO player={"p2"} />
    </ClassicTop>
  );
};

export default CLASSIC_TOP;
