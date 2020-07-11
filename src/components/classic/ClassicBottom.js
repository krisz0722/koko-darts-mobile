import React, { useContext } from "react";
import { ClassicBottom } from "../containers/ClassicWindow";
import { GameContext } from "../../contexts/GameContext";
import CLASSIC_NUM from "../NumButton";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CLASSIC_FUNCTION from "../FunctionButton";

const CLASSIC_BOTTOM = () => {
  const {
    dispatchGameData,
    gameData: {
      showStats,
      activePlayer,
      scoreInputArray: { defaultInput, manualInput },
    },
  } = useContext(GameContext);
  const buttonText =
    defaultInput[0] === "" && manualInput[0] === "" ? "BACK" : "CLEAR";

  const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, buttonText, 0, "OK"];

  return (
    <ClassicBottom>
      {DATA.map((item) => {
        if (typeof item === "number") {
          return (
            <CLASSIC_NUM key={item} value={item}>
              {item}
            </CLASSIC_NUM>
          );
        }

        return (
          <CLASSIC_FUNCTION key={item} value={item}>
            <View>
              {item === "BACK" ? (
                <Icon name={"clear"} />
              ) : item === "CLEAR" ? (
                <Icon name={"clear"} />
              ) : (
                <Icon name={"clear"} />
              )}
              <Text>{item}</Text>
            </View>
          </CLASSIC_FUNCTION>
        );
      })}
    </ClassicBottom>
  );
};

export default CLASSIC_BOTTOM;
