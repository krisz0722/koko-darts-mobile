import { useContext } from "react";
import { GameContext } from "../../../contexts/GameContext";
import { useNavigation } from "@react-navigation/native";

const DATA_MIDDLE = () => {
  const {
    dispatchGameData,
    gameData: { isInputByDart, p1, p2 },
  } = useContext(GameContext);

  const navigation = useNavigation();

  return [
    {
      type: "function",
      value: "MENU",
      action: () => {
        navigation.toggleDrawer();
      },
      icon: "menu",
    },
    {
      type: "dispatch",
      value: "SHOW STATS",
      action: "SHOW_STATS",
      icon: "show-chart",
    },
    {
      type: "dispatch",
      value: "BUST",
      action: "BUST",
      icon: "not-interested",
    },
    {
      type: "info",
      value: p1,
      action: null,
      icon: null,
    },
    {
      type: "dispatch",
      value: isInputByDart ? "INPUT BY ROUND" : "INPUT BY DART",
      action: "CHANGE_INPUT",
      icon: isInputByDart ? "donut-large" : "dart",
    },
    {
      type: "info",
      value: p2,
      action: null,
      icon: null,
    },
  ];
};

export default DATA_MIDDLE;
