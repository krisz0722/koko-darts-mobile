import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components";
import { SettingsContext } from "../../contexts/SettingsContext";
import { BasicText, Flex, FlexCol, Window } from "../../styles/css_mixins";

const Button_Nav = styled(TouchableOpacity)`
  ${Flex};
  flex-direction: ${({ direction }) =>
    direction === "horizontal" ? "row" : "column"};
  width: ${({ length }) => Window.width / length};
  height: 100%;
  padding: ${({ direction }) => (direction === "horizontal" ? "0 5%" : 0)};
  background-color: ${({ theme, active }) =>
    active ? theme.bgActive : "transparent"};
  transform: ${({ active }) => (!active ? "scale(0.8,0.8)" : "")};
`;

const Text_Button = styled(Text)`
  ${BasicText};
  font-weight: ${({ direction }) =>
    direction === "horizontal" ? "bold" : "normal"};
  width: 100%;
  color: ${({ theme, active }) => (active ? theme.text2 : theme.text)};
  font-size: ${({ direction, theme }) =>
    direction === "horizontal" ? theme.nav.fontSize2 : theme.nav.fontSize1};
  border-radius: 4px;
`;

const NavButton = ({
  text,
  length,
  active,
  direction,
  action = null,
  icon = null,
}) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const theme = selectedTheme;

  return (
    <Button_Nav
      direction={direction}
      active={active}
      length={length}
      theme={selectedTheme}
      onPress={action}
    >
      <>
        {icon ? (
          <Icon
            name={icon}
            size={25}
            color={active ? theme.text2 : theme.text}
          />
        ) : null}

        <Text_Button active={active} icon={icon} theme={selectedTheme}>
          {text}
        </Text_Button>
      </>
    </Button_Nav>
  );
};

export default NavButton;
