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
import PROFILE_STATS from "./DataProfile";
import ProfileNavigator from "../../navigators/ProfileTopNavigator";
import { ThemeContext } from "../../contexts/ThemeContext";

const PROFILE = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);

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

  return (
    <>
      <Header>
        <Container>
          <SubContainer />
          <Name theme={theme}>Jose armando</Name>
        </Container>
        <Container2 theme={theme}>
          {PROFILE_STATS.map((item) => (
            <Field key={item.stat}>
              <Stat theme={theme}>{item.stat}</Stat>
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
};

export default PROFILE;

//TODO profile stats font- size, matches font-size,
