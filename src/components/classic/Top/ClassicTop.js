import React, { useContext } from "react";
import { GameContext } from "../../../contexts/GameContext";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { View } from "react-native";
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

  return (
    <ClassicTop showStats={showStats}>
      <PLAYER_INFO player={"p1"} />
      <PLAYER_INFO player={"p2"} />
    </ClassicTop>
  );
};

export default CLASSIC_TOP;
