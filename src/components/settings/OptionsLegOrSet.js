import React, { useContext, useState } from "react";
import { Div, Row2, Row } from "../../screens/settings/StyledSettings";
import SETTINGS_HEADER from "./SettingsHeader";
import SETTINGS_BUTTON from "../buttons/SettingsButton";
import { ThemeContext } from "../../contexts/ThemeContext";
import styled from "styled-components";
import { FlexRowBetween } from "../../styles/css_mixins";
import MODAL_SELECT from "../../components/modals/SelectModal";

const RowMod = styled(Row)`
  top: ${({ page }) =>
    page === "main" ? (100 / 5.5) * 4 + "%" : 30 + 100 / 5.5 + "%"};
`;

const RowMod2 = styled(Row2)`
  top: ${({ page }) =>
    page === "main" ? 100 - 100 / 5.5 / 2 + "%" : 30 + (100 / 5.5) * 2 + "%"};
  width: 100%;
  ${FlexRowBetween};
`;

export const DivMod = styled(Div)`
  height: 100%;
`;

export const OptionsLegOrSet = React.memo((props) => {
  const {
    legOrSet,
    toggleLegOrSet,
    page,
    toWin,
    toggleToWin,
    legsPerSet,
    toggleLegsPerSet,
    animation,
  } = props;
  const { theme } = useContext(ThemeContext);

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

  const data = ["leg", "set"];

  console.log("RENDER  LEG OR SET");

  return (
    <>
      <RowMod page={page} theme={theme} id="gamesettings2">
        <SETTINGS_HEADER text={"match settings"} />

        <Div theme={theme}>
          {["leg", "set"].map((item) => (
            <SETTINGS_BUTTON
              key={item}
              active={legOrSet === item}
              length={data.length}
              action={() => toggleLegOrSet(item)}
              value={item}
            />
          ))}
        </Div>
      </RowMod>
      <RowMod2 page={page} theme={theme}>
        <DivMod>
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
        </DivMod>
      </RowMod2>
      {modalVisible ? (
        <MODAL_SELECT
          animation={animation}
          modalType={modalType}
          visible={modalVisible}
          modalHandler={displayModal}
          toggleToWin={toggleToWin}
          toggleLegsPerSet={toggleLegsPerSet}
          toWin={toWin}
          legsPerSet={legsPerSet}
        />
      ) : null}
    </>
  );
});
