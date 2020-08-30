import React, { useContext, useState } from "react";
import { Div, Row2, Row, Div2 } from "./home/StyledOptions";
import SETTINGS_HEADER from "./SettingsHeader";
import OPTION_BUTTON from "../../components/buttons/OptionButton";
import { ThemeContext } from "../../contexts/ThemeContext";
import MODAL_SELECT from "../../components/modals/SelectModal";

const OPTIONS_LEGORSET = React.memo((props) => {
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

  return (
    <>
      <Row page={page} theme={theme} id="gamesettings2">
        <SETTINGS_HEADER text={"match settings"} />

        <Div theme={theme}>
          {["leg", "set"].map((item) => (
            <OPTION_BUTTON
              key={item}
              active={legOrSet === item}
              length={data.length}
              action={() => toggleLegOrSet(item)}
              value={item}
            />
          ))}
        </Div>
      </Row>
      <Row2 page={page} theme={theme}>
        <Div2>
          <OPTION_BUTTON
            size={"small"}
            length={length}
            value={"first to win"}
          />
          <OPTION_BUTTON
            size={"small"}
            length={length}
            value={toWin}
            icon={"arrow-drop-up"}
            active={true}
            action={() => displayModal("main", legOrSet)}
          />
          <OPTION_BUTTON size={"small"} length={length} value={legOrSet} />
          {legOrSet === "set" ? (
            <>
              <OPTION_BUTTON
                size={"small"}
                length={length}
                value={legsPerSet}
                icon={"arrow-drop-up"}
                active={true}
                action={() => displayModal("sub", "leg")}
              />
              <OPTION_BUTTON
                size={"small"}
                length={length}
                value={"leg per set"}
              />
            </>
          ) : null}
        </Div2>
      </Row2>
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

export default OPTIONS_LEGORSET;
