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

  const DATA = [
    {
      stat: "total games played",
      value: 125,
    },
    {
      stat: "winning percentage",
      value: "56%",
    },
    {
      stat: "overall average",
      value: 120.2,
    },
    {
      stat: "best match average",
      value: 110.2,
    },
    {
      stat: "180s",
      value: 11,
    },
  ];

  return (
    <>
      <Header>
        <Container>
          <SubContainer />
          <Name theme={selectedTheme}>Jose armando</Name>
        </Container>
        <Container2 theme={selectedTheme}>
          {DATA.map((item) => (
            <Field>
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
