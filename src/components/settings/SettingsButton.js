import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import styled from "styled-components";
import { Text, TouchableHighlight } from "react-native";
import { AlignText, FlexCol } from "../../styles/css_mixins";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Div } from "../containers/Settings";

const Button_Settings = styled(TouchableHighlight)`
  ${FlexCol};
  background-color: ${({ theme, active }) =>
    active ? theme.bgActive : "transparent"};
  flex-basis: ${({ length }) => 100 / length + "%"};
  height: 100%;
`;

const Text_Button = styled(Text)`
  ${AlignText};
  ${FlexCol};
  height: 100%;
  width: 100%;
  padding: 0 10%;
  color: ${({ theme, active }) => (active ? theme.text2 : theme.text)};
  font-family: ${({ theme, active }) =>
    active ? theme.fontFamilyBold : theme.fontFamily};
  font-size: ${({ theme }) => theme.settings.fontSizeButton};
  text-transform: ${({ theme }) => theme.textTransform};
`;

const SETTINGS_BUTTON = ({
  length,
  value = "",
  action = null,
  active = false,
  icon = "",
}) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const theme = selectedTheme;

  return (
    <Button_Settings
      active={active}
      length={length}
      onPress={action}
      theme={theme}
    >
      <Div>
        <Text_Button active={active} theme={theme}>
          {value}
        </Text_Button>
        {icon ? <Icon name={icon} size={50} color={theme.text2} /> : null}
      </Div>
    </Button_Settings>
  );
};

export default SETTINGS_BUTTON;
