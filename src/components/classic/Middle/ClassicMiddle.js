import React from "react";
import CLASSIC_FUNCTION from "../../FunctionButton";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { View } from "react-native";
import { FlexRow } from "../../../styles/css_mixins";

export const ClassicMiddle = styled(View)`
  ${FlexRow};
  position: absolute;
  flex-wrap: wrap;
  top: 45%;
  width: 100%;
  height: 18%;
`;

const CLASSIC_MIDDLE = () => {
  const MIDDLE = [
    {
      name: "menu",
      icon: "menu",
      action: null,
    },
    {
      name: "show stats",
      icon: "show_chart",
      action: "SHOW_STATS",
    },
    {
      name: "bust",
      icon: "not_interested",
    },
    {
      name: "current: 170",
      icon: null,
    },
    {
      name: "input by dart",
      icon: "visibility",
      action: "CHANGE_INPUT",
    },
    {
      name: "last: 180",
      icon: null,
    },
  ];

  return (
    <ClassicMiddle>
      {MIDDLE.map((item) => (
        <CLASSIC_FUNCTION
          key={item.name}
          value={item.name}
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
