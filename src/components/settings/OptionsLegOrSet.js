import React, { useContext, useState } from "react";
import { GameContext } from "../../contexts/GameContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import { Div, Row2, Row } from "../containers/Settings";
import { Dimensions, Keyboard } from "react-native";
import SETTINGS_HEADER from "./SettingsHeader";
import SETTINGS_BUTTON from "./SettingsButton";

export const OptionsLegOrSet = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const {
    gameData: { legOrSet, toWin },
    dispatchGameData,
  } = useContext(GameContext);

  const [focus, setFocus] = useState(undefined);
  const [isKeyboardUp, setIsKeyboardUp] = useState(false);

  const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const length = legOrSet === "leg" ? 3 : 5;
  const handleFirstToWin = (val) => {
    dispatchGameData({ type: "CHANGE_TOWIN", value: val });
  };

  const handleLegOrSet = (val) => {
    dispatchGameData({ type: "CHANGE_LEGORSET", value: val });
  };

  const keyboardDidShow = (e) => {
    let newSize = Dimensions.get("window").height - e.endCoordinates.height;
    setIsKeyboardUp(true);
  };
  const data = ["leg", "set"];
  const keyboardDidHide = (e) => {
    let newSize = Dimensions.get("window").height;
    setIsKeyboardUp(false);
    setFocus(undefined);
  };

  Keyboard.addListener("keyboardDidShow", keyboardDidShow);
  Keyboard.addListener("keyboardDidHide", keyboardDidHide);

  const handleFocus = (e) => {
    setFocus(e);
  };

  return (
    <>
      <Row theme={selectedTheme} id="gamesettings2">
        <SETTINGS_HEADER text={"match settings"} />

        <Div theme={selectedTheme}>
          {["leg", "set"].map((item) => (
            <SETTINGS_BUTTON
              active={legOrSet === item}
              length={data.length}
              action={() => handleLegOrSet(item)}
              value={item}
            />
          ))}
        </Div>
      </Row>
      <Row2 theme={selectedTheme}>
        <SETTINGS_BUTTON length={length} value={"first to win"} />
        <SETTINGS_BUTTON
          length={length}
          value={toWin}
          icon={"arrow-drop-up"}
          active={true}
        />
        <SETTINGS_BUTTON length={length} value={legOrSet} />
        {legOrSet === "set" ? (
          <>
            <SETTINGS_BUTTON
              length={length}
              value={toWin}
              icon={"arrow-drop-up"}
              active={true}
            />
            <SETTINGS_BUTTON length={length} value={"leg per set"} />
          </>
        ) : null}
      </Row2>
    </>
  );
};
