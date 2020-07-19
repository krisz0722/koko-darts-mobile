import { useContext } from "react";
import { GameContext } from "../../../contexts/GameContext";

const DATA_BOTTOM = () => {
  const {
    gameData,
    gameData: {
      inactivePlayer,
      isInputByDart,
      inputByDart,
      inputByRound,

      whichDart,
    },
  } = useContext(GameContext);

  const canGoBack = gameData[inactivePlayer + "_DATA"].canGoBack;

  const backOrClear =
    inputByRound[0] === "" && inputByDart.first[0] === "" && canGoBack
      ? "BACK"
      : "CLEAR";

  const okOrNext = isInputByDart && whichDart !== 3 ? "NEXT" : "OK";

  return [
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
};

export default DATA_BOTTOM;
