import React, { useContext, useState, useEffect } from "react";
import { InfoCon, Title } from "./StyledInGame";

import { BackHandler } from "react-native";
import EXIT_APP_ALERT from "../../components/modals/ExitAppAlert";
import { ThemeContext } from "../../contexts/ThemeContext";

const PLAYER_IS_IN_GAME = React.memo(() => {
  const {
    theme,
    themeContext: { animation },
  } = useContext(ThemeContext);

  const [exitModal, setExitModal] = useState(false);

  const handleExitApp = () => {
    BackHandler.exitApp();
    setExitModal(!exitModal);
  };

  const backAction = () => {
    setExitModal(true);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction,
  );

  useEffect(() => {
    return () => backHandler.remove();
  }, [backHandler]);

  return (
    <>
      {exitModal ? (
        <EXIT_APP_ALERT
          animation={animation}
          theme={theme}
          action1={() => setExitModal(!exitModal)}
          action2={handleExitApp}
          visible={exitModal}
        />
      ) : null}
      <InfoCon>
        <Title>{"you are in another match"}</Title>
      </InfoCon>
    </>
  );
});
export default PLAYER_IS_IN_GAME;
