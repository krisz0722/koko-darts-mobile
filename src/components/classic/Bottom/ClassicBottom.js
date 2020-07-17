import React, { useContext } from "react";
import { Animated } from "react-native";
import { GameContext } from "../../../contexts/GameContext";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { FlexRow } from "../../../styles/css_mixins";

import NUM_BUTTON from "../../buttons/NumButton";

export const ClassicBottom = styled(Animated.View)`
  ${FlexRow};
  flex-wrap: wrap;
  position: absolute;
  top: 63%;
  width: 100%;
  height: 37%;
`;

const CLASSIC_BOTTOM = React.memo(() => {
  const {
    gameData: {
      isInputByDart,
      scoreInputArray: { inputByDart, inputByRound, inputByDartArray },
    },
  } = useContext(GameContext);

  const backOrClear =
    inputByRound[0] === "" && inputByDart[0] === "" ? "BACK" : "CLEAR";

  const okOrNext = isInputByDart && inputByDartArray[0] !== "" ? "NEXT" : "OK";

  const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, backOrClear, 0, okOrNext];

  return (
    <ClassicBottom>
      {DATA.map((item) => {
        return <NUM_BUTTON item={item} />;
      })}
    </ClassicBottom>
  );
});

export default CLASSIC_BOTTOM;
