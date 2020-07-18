import { useContext } from "react";
import { GameContext } from "../../../contexts/GameContext";

const DATA_MIDDLE = () => {
  const {
    gameData: { isInputByDart },
  } = useContext(GameContext);

  return [
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
};

export default DATA_MIDDLE;
