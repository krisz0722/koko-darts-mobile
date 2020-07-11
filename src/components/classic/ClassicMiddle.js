import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { ClassicMiddle } from "../containers/ClassicWindow";
import { GameContext } from "../../contexts/GameContext";
import CLASSIC_FUNCTION from "../FunctionButton";

const CLASSIC_MIDDLE = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const {
    dispatchGameData,
    gameData: {
      showStats,
      scoreInputArray: { defaultInput, manualInput },
    },
  } = useContext(GameContext);

  const buttonText =
    defaultInput[0] === "" && manualInput[0] === "" ? "BACK" : "CLEAR";

  const handleOnClickStats = () => {
    console.log(showStats);
    dispatchGameData({ type: "SHOW_STATS" });
  };

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
