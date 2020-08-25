import React, { useContext, useEffect } from "react";
import {
  Header,
  NameText,
  Name,
  Container,
  Container2,
  NavigationWindow,
  SubContainer,
  Field,
  Stat,
  StatValue,
  EditButton,
} from "./StyledProfile";
import { BackHandler, TouchableOpacity } from "react-native";
import ProfileNavigator from "../../navigators/ProfileTopNavigator";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Authcontext } from "../../contexts/AuthContext";
import Icon from "react-native-vector-icons/MaterialIcons";

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
          {/*<EditButton onPress={() => alert("gyaaa")} theme={theme}>*/}
          {/*  <Icon name={"create"} size={20} color={theme.text2} />*/}
          {/*</EditButton>*/}
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
        <ProfileNavigator />
      </NavigationWindow>
    </>
  );
};

export default PROFILE;

//TODO profile stats font- size, matches font-size,
