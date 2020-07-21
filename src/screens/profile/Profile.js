import React, { useContext, useEffect } from "react";
import {
  Header,
  Name,
  Container,
  Container2,
  NavigationWindow,
  SubContainer,
  Field,
  Stat,
  StatValue,
} from "./StyledProfile";
import { BackHandler } from "react-native";
import { SettingsContext } from "../../contexts/SettingsContext";
import PROFILE_STATS from "./DataProfile";
import ProfileNavigator from "../../navigators/ProfileTopNavigator";

const PROFILE = React.memo(({ navigation }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("home");
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  console.log("RENDER PROFILE SCREEN");

  return (
    <>
      <Header>
        <Container>
          <SubContainer />
          <Name theme={selectedTheme}>Jose armando</Name>
        </Container>
        <Container2 theme={selectedTheme}>
          {PROFILE_STATS.map((item) => (
            <Field key={item.stat}>
              <Stat theme={selectedTheme}>{item.stat}</Stat>
              <StatValue>{item.value}</StatValue>
            </Field>
          ))}
        </Container2>
      </Header>
      <NavigationWindow>
        <ProfileNavigator />
      </NavigationWindow>
    </>
  );
});

export default PROFILE;

//TODO profile stats font- size, matches font-size,
