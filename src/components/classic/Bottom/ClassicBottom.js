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
    gameData,
    gameData: {
      inactivePlayer,
      isInputByDart,
      inputByDart,
      inputByRound,
      inputByDartArray,
      whichDart,
    },
  } = useContext(GameContext);

  const canGoBack = gameData[inactivePlayer + "_DATA"].canGoBack;

  const backOrClear =
    inputByRound[0] === "" && inputByDart.first.length === 0 && canGoBack
      ? "BACK"
      : "CLEAR";

  const okOrNext =
    isInputByDart && inputByDartArray[0] !== "" && whichDart !== 3
      ? "NEXT"
      : "OK";

  const DATA = [
    {
      type: "num",
      value: 1,
      action: "type",
      icon: null,
    },
    {
      type: "num",
      value: 2,
      action: "type",
      icon: null,
    },
    {
      type: "num",
      value: 3,
      action: "type",
      icon: null,
    },
    {
      type: "num",
      value: 4,
      action: "type",
      icon: null,
    },
    {
      type: "num",
      value: 5,
      action: "type",
      icon: null,
    },
    {
      type: "num",
      value: 6,
      action: "type",
      icon: null,
    },
    {
      type: "num",
      value: 7,
      action: "type",
      icon: null,
    },
    {
      type: "num",
      value: 8,
      action: "type",
      icon: null,
    },
    {
      type: "num",
      value: 9,
      action: "type",
      icon: null,
    },
    {
      type: "function",
      value: backOrClear,
      action: backOrClear,
      icon: backOrClear === "CLEAR" ? "clear" : "show-chart",
    },
    {
      type: "num",
      value: 0,
      action: "type",
      icon: null,
    },
    {
      type: "function",
      value: okOrNext,
      action: okOrNext,
      icon: okOrNext === "OK" ? "check" : "dart",
    },
  ];

  return (
    <ClassicBottom>
      {DATA.map((item) => {
        return (
          <NUM_BUTTON
            type={item.type}
            value={item.value}
            action={item.action}
            icon={item.icon}
          />
        );
      })}
    </ClassicBottom>
  );
});

export default CLASSIC_BOTTOM;
