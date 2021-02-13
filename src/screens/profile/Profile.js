import React, { useContext, useEffect } from "react";
import {
  Header,
  NameText,
  Container,
  Container2,
  NavigationWindow,
  SubContainer,
  Field,
  Stat,
  StatValue,
} from "./StyledProfile";
import { BackHandler } from "react-native";
import PROFILE_NAVIGATOR from "../../navigators/ProfileTopNavigator";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Authcontext } from "../../contexts/AuthContext";

const PROFILE = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const {
    userData: { username, img, userOverall },
  } = useContext(Authcontext);

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

  const { overallAvg, totalGames, winningPercentage, bestMatch } = userOverall;

  const DATA = [
    {
      stat: "total games played",
      value: totalGames,
    },
    {
      stat: "winning percentage",
      value: winningPercentage,
    },
    {
      stat: "overall average",
      value: overallAvg.toFixed(1),
    },
    {
      stat: "best match average",
      value: bestMatch.toFixed(1),
    },
  ];

  return (
    <>
      <Header>
        <Container>
          <SubContainer source={{ uri: img }} />
          <NameText theme={theme}>{username}</NameText>
        </Container>
        <Container2 theme={theme}>
          {DATA.map((item) => (
            <Field theme={theme} key={item.stat}>
              <Stat theme={theme}>{item.stat}</Stat>
              <StatValue>{item.value}</StatValue>
            </Field>
          ))}
        </Container2>
      </Header>
      <NavigationWindow>
        <PROFILE_NAVIGATOR />
      </NavigationWindow>
    </>
  );
};

export default PROFILE;
