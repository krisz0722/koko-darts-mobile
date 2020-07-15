import React from "react";
import PROFILE_NAVIGATOR_TAB from "../../components/navigation/ProfileTabNavigator";
import ProfileNavigator from "../../navigators/ProfileNavigator";
import {
  Header,
  Name,
  Container,
  NavigationWindow,
  SubContainer,
} from "./StyledProfile";

const PROFILE = () => {
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
