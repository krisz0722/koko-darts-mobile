import React, { useContext } from "react";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { View } from "react-native";
import { FlexRow } from "../../../styles/css_mixins";
import { GameContext } from "../../../contexts/GameContext";
import NUM_BUTTON from "../../buttons/NumButton";
import PLAYER_INPUT_INFO from "../../buttons/PlayerInputInfo";

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
    gameData: { isInputByDart },
  } = useContext(GameContext);

  const MIDDLE = [
    {
      type: "function",
      value: "MENU",
      action: "TOGGLE_DRAWER",
      icon: "menu",
    },
    {
      type: "function",
      value: "SHOW STATS",
      action: "SHOW_STATS",
      icon: "show-chart",
    },
    {
      type: "function",
      value: "BUST",
      action: "BUST",
      icon: "not-interested",
    },
    {
      type: "info",
      value: "p1",
      action: null,
      icon: null,
    },
    {
      type: "function",
      value: isInputByDart ? "INPUT BY ROUND" : "INPUT BY DART",
      action: "CHANGE_INPUT",
      icon: isInputByDart ? "donut-large" : "dart",
    },
    {
      type: "info",
      value: "p2",
      action: null,
      icon: null,
    },
  ];

  return (
    <ClassicMiddle>
      {MIDDLE.map((item) => (
        <>
          {item.value === "p2" || item.value === "p1" ? (
            <PLAYER_INPUT_INFO value={item.value} name={item.value} />
          ) : (
            <NUM_BUTTON
              middle={true}
              type={item.type}
              value={item.value}
              action={item.action}
              icon={item.icon}
            />
          )}
        </>
      ))}
    </ClassicMiddle>
  );
};

export default CLASSIC_MIDDLE;
