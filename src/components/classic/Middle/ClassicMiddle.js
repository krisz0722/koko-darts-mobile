import React, { useContext } from "react";
import CLASSIC_FUNCTION from "../../buttons/FunctionButton";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { View } from "react-native";
import { FlexRow } from "../../../styles/css_mixins";
import { GameContext } from "../../../contexts/GameContext";

export const ClassicMiddle = styled(View)`
  ${FlexRow};
  position: absolute;
  flex-wrap: wrap;
  top: 45%;
  width: 100%;
  height: 18%;
`;

const CLASSIC_MIDDLE = () => {
  const {
    gameData,
    gameData: { activePlayer, isInputByDart },
  } = useContext(GameContext);

  const MIDDLE = [
    {
      name: "menu",
      value: "menu",
      icon: "menu",
      action: () => null,
    },
    {
      name: "showStats",
      value: "show stats",
      icon: "show-chart",
      action: "SHOW_STATS",
    },
    {
      name: "bust",
      value: "bust",
      icon: "not-interested",
    },
    {
      name: "p1",
      value: `${gameData.p1}`,
      icon: null,
      action: null,
    },
    {
      name: "changeInput",
      value: isInputByDart ? "input by round" : "input by dart",
      icon: isInputByDart ? "visibility" : "clear",
      action: "CHANGE_INPUT",
    },
    {
      name: "p2",
      value: `${gameData.p2}`,
      icon: null,
      action: null,
    },
  ];

  return (
    <ClassicMiddle>
      {MIDDLE.map((item) => (
        <CLASSIC_FUNCTION
          key={item.name}
          name={item.name}
          value={item.value}
          middle={true}
          icon={item.icon}
          action={item.action}
        >
          {item.name}
        </CLASSIC_FUNCTION>
      ))}
    </ClassicMiddle>
  );
};

export default CLASSIC_MIDDLE;
