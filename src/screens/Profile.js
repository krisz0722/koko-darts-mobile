import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import styled from "styled-components";
import {
  BasicText,
  Border,
  BorderHorizontal,
  FlexColAround,
  FlexRow,
  Window,
} from "../styles/css_mixins";
import PROFILE_NAVIGATOR_TAB from "../components/ProfileTabNavigator";
import ProfileNavigator from "../navigators/ProfileNavigator";

const Header = styled(View)`
  ${FlexRow};
  height: 30%;
  width: 100%;
`;

const Container = styled(View)`
  ${FlexColAround};
  width: 50%;
  height: 100%;
`;

const SubContainer = styled(View)`
  width: 75%;
  height: ${() => (Window.width / 2 / 4) * 3};
  border-radius: 4px;
  ${Border(({ theme }) => theme.text)};
`;

const Name = styled(Text)`
  ${BasicText};
  width: 75%;
  color: ${({ theme }) => theme.text};
`;

const NavigationWindow = styled(View)`
  height: 62%;
  width: 100%;
`;

const ProfileSubScreens = styled(View)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const PROFILE = () => {
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
