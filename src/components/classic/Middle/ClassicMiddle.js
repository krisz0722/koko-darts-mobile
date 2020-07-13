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
  const {
    gameData,
    gameData: { activePlayer },
  } = useContext(GameContext);
  console.log(gameData.scoreInputArray.defaultInput.join(""));
  const MIDDLE = [
    {
      name: "menu",
      icon: "menu",
      action: null,
    },
    {
      name: "show stats",
      icon: "show-chart",
      action: "SHOW_STATS",
    },
    {
      name: "bust",
      icon: "not-interested",
    },
    {
      name: "current:" + gameData.scoreInputArray.defaultInput.join(""),
      icon: null,
      action: null,
    },
    {
      name: "input by dart",
      icon: "visibility",
      action: "CHANGE_INPUT",
    },
    {
      name: "last: 180",
      icon: null,
      action: null,
    },
  ];

  return (
    <ClassicMiddle>
      {MIDDLE.map((item) =>
        item.action === null ? (
          <View_Function
            key={item.name}
            value={item.name}
            middle={true}
            icon={item.icon}
            action={item.action}
            ap={activePlayer}
          >
            <Text_Function>valami</Text_Function>
          </View_Function>
        ) : (
          <CLASSIC_FUNCTION
            key={item.name}
            value={item.name}
            middle={true}
            icon={item.icon}
            action={item.action}
          >
            {item.name}
          </CLASSIC_FUNCTION>
        ),
      )}
    </ClassicMiddle>
  );
};

export default CLASSIC_MIDDLE;
