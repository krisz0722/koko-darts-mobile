import React, { useContext, useState, useEffect } from "react";
import { InfoCon, Title } from "./StyledInGame";
import { usersCollection } from "../../_db/crudOther";
import { Authcontext } from "../../contexts/AuthContext";
import { CommonActions } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { BackHandler } from "react-native";
import EXIT_APP_ALERT from "../../components/modals/ExitAppAlert";
import { ThemeContext } from "../../contexts/ThemeContext";

const PLAYER_IS_IN_GAME = React.memo(({ navigation }) => {
  const {
    userData: { username },
  } = useContext(Authcontext);

  const {
    theme,
    themeContext: { animation },
  } = useContext(ThemeContext);

  const focused = useIsFocused();

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

  useEffect(() => {
    const unsubscribe = usersCollection
      .where("username", "==", username)
      .onSnapshot((snapshot) => {
        const profile =
          snapshot.docs.length > 0
            ? snapshot.docs
                .find((item) => item.data().username === username)
                .data()
            : null;
        console.log("PROFILE", profile);
        if (focused) {
          const { inGame } = profile;
          if (!inGame) {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{ name: "homedrawernavigator" }],
              }),
            );
          }
        }
      });

    return () => {
      unsubscribe();
    };
  }, [navigation, username]);

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
