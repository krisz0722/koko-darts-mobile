import React, { useContext, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { CommonActions } from "@react-navigation/native";
import { Message, Safe, Title, Con } from "./StyledErrorScreen";
import { BackHandler } from "react-native";
import { ScreenContainer } from "../../navigators/StyledNav";
import { AppBackground } from "../../../App";
import AUTH_BUTTON from "../../components/buttons/LoginButton";

const AUTH_ERROR_SCREEN = React.memo(({ navigation, filled }) => {
  const {
    theme,
    themeContext: { background },
  } = useContext(ThemeContext);

  useEffect(() => {
    const backAction = () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: "authnavigator",
            },
          ],
        }),
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  const reset = () =>
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: "authnavigator",
          },
        ],
      }),
    );

  const params = useRoute().params;
  const title = params ? params.title : "NEMJO";
  const message = params ? params.message : "NEMJO";

  return (
    <>
      {background ? (
        <AppBackground
          source={require("../../../assets/bg.png")}
          resizeMode="cover"
        />
      ) : null}

      <ScreenContainer theme={theme}>
        <Safe filled={filled} theme={theme}>
          <Con filled={filled}>
            <Title filled={filled} theme={theme}>
              {title}
            </Title>
            <Message filled={filled} theme={theme}>
              {message}
            </Message>
            <AUTH_BUTTON
              type={"active"}
              text={"sign up"}
              action={() => reset()}
              align={"center"}
              social={"exit-to-app"}
            />
            <AUTH_BUTTON
              type={"basic"}
              text={"report bug"}
              action={() => navigation.navigate("reportbug")}
              align={"center"}
              social={"bug-report"}
            />
          </Con>
        </Safe>
      </ScreenContainer>
    </>
  );
});

export default AUTH_ERROR_SCREEN;
