import React, { useContext } from "react";
import ShapeThrow from "../../../assets/shapeThrow";
import {
  View_Headers,
  Text_Subtitle,
  Text_Subtitle2,
  Text_Title,
  View_Shape,
} from "./StyledWelcome";
import { NavBar } from "../../navigators/CustomTabNavigator";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Button } from "react-native";

const WELCOME = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  const TABBAR_ITEMS = [
    {
      route: "register",
      text: "let's do it now!",
      icon: null,
      action: () => navigation.navigate("register"),
    },
    {
      route: "homenavigator",
      text: "no thanks, let me play!",
      icon: null,
      action: () => navigation.navigate("homenavigator"),
    },
  ];

  return (
    <>
      <View_Headers theme={theme}>
        <Text_Title theme={theme}>
          Welcome to koko's darts scoreboard!
        </Text_Title>
        <Text_Subtitle theme={theme}>
          Sign up and create a profile in order to save and sync your games
          between your computer and mobile device.
        </Text_Subtitle>
        <Text_Subtitle2 theme={theme}>
          If you skip this step now, you can sign up later in the profile menu.
        </Text_Subtitle2>
      </View_Headers>
      <View_Shape theme={theme}>
        <ShapeThrow fill={theme.bgActive} />
      </View_Shape>
      <NavBar theme={theme}>
        {TABBAR_ITEMS.map((item) => (
          <Button
            key={item.route}
            color={"light"}
            height={10}
            length={3}
            direction={"horizontal"}
            title={"item.text"}
            icon={item.icon}
            onPress={item.action}
          />
        ))}
      </NavBar>
    </>
  );
};

export default WELCOME;
