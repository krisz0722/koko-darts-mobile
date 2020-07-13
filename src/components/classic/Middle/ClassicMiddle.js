import React, { useContext } from "react";
import CLASSIC_FUNCTION, {
  Text_Function,
  View_Function,
} from "../../FunctionButton";
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
  const { gameData } = useContext(GameContext);

  const MIDDLE = [
    {
      name: "menu",
      value: "menu",
      icon: "menu",
      action: null,
      disabled: false,
    },
    {
      name: "showStats",
      value: "show stats",
      icon: "show-chart",
      action: "SHOW_STATS",
      disabled: false,
    },
    {
      name: "bust",
      value: "bust",
      icon: "not-interested",
      disabled: false,
    },
    {
      name: "p1",
      value: `${gameData.p1}`,
      icon: null,
      action: null,
      disabled: true,
    },
    {
      name: "changeInput",
      value: "input by dart",
      icon: "visibility",
      action: "CHANGE_INPUT",
      disabled: false,
    },
    {
      name: "p2",
      value: `${gameData.p2}`,
      icon: null,
      action: null,
      disabled: true,
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
          disabled={item.disabled}
        >
          {item.name}
        </CLASSIC_FUNCTION>
      ))}
    </ClassicMiddle>
  );
};

export default CLASSIC_MIDDLE;
