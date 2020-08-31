import React, { useContext, useEffect } from "react";
import { InfoCon, Title } from "./StyledInGame";
import { usersCollection } from "../../_backend/db/crudOther";
import { Authcontext } from "../../contexts/AuthContext";
import { CommonActions, useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

const PLAYER_IS_IN_GAME = React.memo(({ navigation }) => {
  const {
    userData: { username },
  } = useContext(Authcontext);

  const focused = useIsFocused();

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
    <InfoCon>
      <Title>{"you are in another match"}</Title>
    </InfoCon>
  );
});
export default PLAYER_IS_IN_GAME;
