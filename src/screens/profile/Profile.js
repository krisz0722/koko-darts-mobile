import React, { useContext, useEffect } from "react";
import PROFILE_NAVIGATOR_TAB from "../../components/navigation/ProfileTabNavigator";
import ProfileNavigator from "../../navigators/ProfileNavigator";
import {
  Header,
  Name,
  Container,
  NavigationWindow,
  SubContainer,
} from "./StyledProfile";
import { BackHandler } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NavigationContext } from "../../contexts/NavigationContext";

const PROFILE = ({ route, navigation }) => {
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
  }, []);

  return (
    <>
      <Header>
        <Container>
          <SubContainer />
          <Name>valami</Name>
        </Container>
        <Container>
          <Name>friends</Name>
          <Name>friends</Name>
          <Name>friends</Name>
          <Name>friends</Name>
          <Name>friends</Name>
          <Name>friends</Name>
        </Container>
      </Header>
      <NavigationWindow>
        <PROFILE_NAVIGATOR_TAB />
        <ProfileNavigator />
      </NavigationWindow>
    </>
  );
};

export default PROFILE;
