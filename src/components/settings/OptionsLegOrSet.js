import React, { useContext, useState } from "react";
import { GameContext } from "../../contexts/GameContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import { Div, Row2, Row } from "../../screens/settings/StyledSettings";
import SETTINGS_HEADER from "./SettingsHeader";
import SETTINGS_BUTTON from "./SettingsButton";
import MODAL_SELECT from "./Modal";

export const OptionsLegOrSet = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const {
    gameData: { legOrSet, toWin, legsPerSet },
    dispatchGameData,
  } = useContext(GameContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState({
    type: "main",
    legOrSet: "leg",
  });

  const displayModal = (type = null, legOrSet = null) => {
    setModalVisible(!modalVisible);
    if (legOrSet) {
      setModalType({
        type,
        legOrSet,
      });
    }
  };

  const length = legOrSet === "leg" ? 3 : 5;

  const handleLegOrSet = (val) => {
    dispatchGameData({ type: "CHANGE_LEGORSET", value: val });
  };

  const data = ["leg", "set"];

  return (
    <>
      <Row theme={selectedTheme} id="gamesettings2">
        <SETTINGS_HEADER text={"match settings"} />

        <Div theme={selectedTheme}>
          {["leg", "set"].map((item) => (
            <SETTINGS_BUTTON
              key={item}
              active={legOrSet === item}
              length={data.length}
              action={() => handleLegOrSet(item)}
              value={item}
            />
          ))}
        </Div>
      </Row>
      <Row2 theme={selectedTheme}>
        <SETTINGS_BUTTON
          size={"small"}
          length={length}
          value={"first to win"}
        />
        <SETTINGS_BUTTON
          length={length}
          value={toWin}
          icon={"arrow-drop-up"}
          active={true}
          action={() => displayModal("main", legOrSet)}
        />
        <SETTINGS_BUTTON size={"small"} length={length} value={legOrSet} />
        {legOrSet === "set" ? (
          <>
            <SETTINGS_BUTTON
              size={"small"}
              length={length}
              value={legsPerSet}
              icon={"arrow-drop-up"}
              active={true}
              action={() => displayModal("sub", "leg")}
            />
            <SETTINGS_BUTTON
              size={"small"}
              length={length}
              value={"leg per set"}
            />
          </>
        ) : null}
      </Row2>
      <MODAL_SELECT
        modalType={modalType}
        visible={modalVisible}
        modalHandler={displayModal}
      />
    </>
  );
};
