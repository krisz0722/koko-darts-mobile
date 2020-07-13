import styled from "styled-components";
import { Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import { FlexColAround, Window } from "../styles/css_mixins";
import Icon from "react-native-vector-icons/MaterialIcons";
import { NavigationContext } from "../contexts/NavigationContext";

const Button_Nav = styled(TouchableOpacity)`
  ${FlexColAround};
  width: ${({ length }) => Window.width / length};
  height: 100%;
  background-color: ${({ theme, active }) =>
    active ? theme.bgActive : "transparent"};
  transform: ${({ active }) => (!active ? "scale(0.8,0.8)" : "")};
`;

const Text_Button = styled(Text)`
  text-align:center;
  width: 100%;
  padding: 0 5%;
  color: ${({ theme, active }) => (active ? theme.text2 : theme.text)};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size:10};
  text-transform: ${({ theme }) => theme.textTransform};
  border-radius: 4px;
`;

const NavButton = ({ text, length, action = null, icon = null }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const { screen } = useContext(NavigationContext);

  const theme = selectedTheme;

  return (
    <Button_Nav
      active={screen === text}
      length={length}
      theme={selectedTheme}
      onPress={action}
    >
      <>
        {icon ? (
          <Icon
            name={icon}
            size={25}
            color={screen === text ? theme.text2 : theme.text}
          />
        ) : null}

        <Text_Button active={screen === text} icon={icon} theme={selectedTheme}>
          {text}
        </Text_Button>
      </>
    </Button_Nav>
  );
};

export default NavButton;
