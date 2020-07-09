import React, { useContext, useState } from "react";
import { GameContext } from "../../contexts/GameContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import {
  Div,
  Button_DropDown,
  Row2,
  Button_Settings,
  Header,
  Row,
  Text_Button,
  View_Picker,
} from "../_styled/Styled_Settings";
import { Dimensions, Keyboard, Picker, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export const GAMESETTINGS2 = () => {
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
        <Header theme={selectedTheme}>match mode</Header>
        <Div theme={selectedTheme}>
          {["leg", "set"].map((item) => (
            <Button_Settings
              active={legOrSet === item}
              length={data.length}
              onPress={() => handleLegOrSet(item)}
              theme={selectedTheme}
            >
              <Text_Button active={legOrSet === item} theme={selectedTheme}>
                {item}
              </Text_Button>
            </Button_Settings>
          ))}
        </Div>
      </Row>
      <Row2 theme={selectedTheme}>
        <Button_Settings length={length}>
          <Text_Button length={length} theme={selectedTheme}>
            first to win
          </Text_Button>
        </Button_Settings>
        <Button_DropDown active theme={selectedTheme} length={length}>
          <>
            <Text_Button active theme={selectedTheme}>
              {toWin}
            </Text_Button>
            <Icon
              name="arrow-drop-up"
              size={50}
              color={selectedTheme.text2}
              fill={"blue"}
            />
          </>
        </Button_DropDown>
        <Button_Settings length={length} theme={selectedTheme}>
          <Text_Button length={length} theme={selectedTheme}>
            {legOrSet}
          </Text_Button>
        </Button_Settings>
        {legOrSet === "set" ? (
          <>
            <Button_DropDown active theme={selectedTheme} length={length}>
              <>
                <Text_Button active theme={selectedTheme}>
                  {toWin}
                </Text_Button>
                <Icon
                  name="arrow-drop-up"
                  size={50}
                  color={selectedTheme.text2}
                  fill={"blue"}
                />
              </>
            </Button_DropDown>
            <Button_Settings length={length} theme={selectedTheme}>
              <Text_Button length={length} theme={selectedTheme}>
                leg per set
              </Text_Button>
            </Button_Settings>
          </>
        ) : null}
      </Row2>
    </>
  );
};
