import React, { useContext, useEffect } from "react";
import PROFILE_NAVIGATOR_TAB from "../../components/navigation/ProfileTabNavigator";
import ProfileNavigator from "../../navigators/ProfileNavigator";
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
import { NavigationContext } from "../../contexts/NavigationContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import PROFILE_STATS from "./DataProfile";

const PROFILE = ({ route, navigation }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const { setHomeTabScreen } = useContext(NavigationContext);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("home");
      setHomeTabScreen("home");
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation, setHomeTabScreen]);

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
        <PROFILE_NAVIGATOR_TAB />
        <ProfileNavigator />
      </NavigationWindow>
    </>
  );
};

export default PROFILE;

//TODO profile stats font- size, matches font-size,
